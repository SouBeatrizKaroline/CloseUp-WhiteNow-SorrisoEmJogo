(function(root){
'use strict';
const SIZE=18, GOAL=12;
const directions={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
function isPlayable(x,y){
 if(x<1||x>SIZE||y<1||y>SIZE)return false;
 if(y===1)return (x>=4&&x<=8)||(x>=11&&x<=15);
 if(y===2)return x>=3&&x<=16;
 if(y<=9)return x>=2&&x<=17;
 if(y<=12)return x>=3&&x<=16;
 if(y===13)return x>=4&&x<=15;
 if(y<=15)return (x>=4&&x<=8)||(x>=11&&x<=15);
 if(y===16)return (x>=5&&x<=8)||(x>=11&&x<=14);
 if(y===17)return (x>=6&&x<=8)||(x>=11&&x<=13);
 return x===7||x===12;
}
function foodFor(snake,random=Math.random){const free=[];for(let y=1;y<=SIZE;y++)for(let x=1;x<=SIZE;x++)if(isPlayable(x,y)&&!snake.some(p=>p.x===x&&p.y===y))free.push({x,y});return free.length?free[Math.min(free.length-1,Math.floor(random()*free.length))]:null;}
function create(){const snake=[{x:9,y:8},{x:8,y:8},{x:7,y:8}];return {snake,direction:directions.right,pending:null,food:foodFor(snake),score:0,status:'ready'};}
function turn(state,name){const next=directions[name];if(state.status!=='playing'||!next||state.pending)return;if(next.x===-state.direction.x&&next.y===-state.direction.y)return;state.pending=next;}
function step(state){if(state.status!=='playing')return;const dir=state.pending||state.direction;state.pending=null;state.direction=dir;const head={x:state.snake[0].x+dir.x,y:state.snake[0].y+dir.y};const eating=!!state.food&&head.x===state.food.x&&head.y===state.food.y;const body=eating?state.snake:state.snake.slice(0,-1);if(!isPlayable(head.x,head.y)||body.some(p=>p.x===head.x&&p.y===head.y)){state.status='over';return;}state.snake.unshift(head);if(eating){state.score++;if(state.score>=GOAL){state.food=null;state.status='won';}else{state.food=foodFor(state.snake);if(!state.food)state.status='won';}}else state.snake.pop();}
const api={SIZE,GOAL,directions,isPlayable,foodFor,create,turn,step};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BooEngine=api;
})(globalThis);
