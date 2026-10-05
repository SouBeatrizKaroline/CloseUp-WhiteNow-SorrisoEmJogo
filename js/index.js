'use strict';
const $=id=>document.getElementById(id),engine=window.BooEngine;
const tips=[
 ['CONHEÇA O WHITE NOW','O briefing apresenta tecnologia óptica: um efeito visual de dentes mais brancos desde a primeira escovação.'],
 ['GAME ≠ TRATAMENTO','Você capturou uma cárie fictícia. Creme dental não remove uma cárie real.'],
 ['UM EFEITO VISUAL','Efeito óptico e clareamento permanente são coisas diferentes. Conheça a proposta do produto.'],
 ['CUIDADO COM O SORRISO','Dúvidas sobre a saúde dos dentes? Procure orientação de um dentista.'],
 ['CONHECER ANTES DE ESCOLHER','Leia a embalagem para conhecer as informações e instruções de uso do produto.'],
 ['DA DESCOBERTA À EXPERIÊNCIA','A campanha conecta diversão, conhecimento do produto e uma proposta de experimentação.']
];
let state=engine.create(),last=0,enabled=false,best=0,touchStart=null;
try{best=Math.max(0,Number(localStorage.getItem('white-now-best'))||0);}catch{}
const music=new Audio('music/music.mp3'),foodAudio=new Audio('music/food.mp3'),overAudio=new Audio('music/gameover.mp3');music.loop=true;music.volume=.2;foodAudio.volume=.5;overAudio.volume=.4;
function play(audio){if(enabled){audio.currentTime=0;audio.play().catch(()=>{});}}
function updateMusic(){if(enabled&&state.status==='playing')music.play().catch(()=>{});else music.pause();}
const tiles=document.createDocumentFragment();for(let y=1;y<=engine.SIZE;y++)for(let x=1;x<=engine.SIZE;x++)if(engine.isPlayable(x,y))cell({x,y},'tooth-tile',tiles);$('board').append(tiles);
function cell(point,kind,parent){const el=document.createElement('div');el.className=kind;el.style.gridColumnStart=point.x;el.style.gridRowStart=point.y;parent.append(el);return el;}
function render(){document.querySelectorAll('#board .head,#board .snake,#board .food').forEach(el=>el.remove());const fragment=document.createDocumentFragment();state.snake.forEach((part,i)=>{const el=cell(part,i?'snake':'head',fragment);if(!i)el.style.setProperty('--angle',state.direction.x===1?'90deg':state.direction.x===-1?'-90deg':state.direction.y===1?'180deg':'0deg');});if(state.food)cell(state.food,'food',fragment);$('board').append(fragment);$('score').textContent=String(state.score).padStart(2,'0');$('best').textContent=String(best).padStart(2,'0');$('board').setAttribute('aria-label',`Dente: ${state.score} de ${engine.GOAL} cáries fictícias coletadas.`);$('progress-fill').style.width=`${state.score/engine.GOAL*100}%`;$('progress').setAttribute('aria-valuenow',String(state.score));}
function sync(){const active=state.status==='playing',paused=state.status==='paused';$('overlay').hidden=active;$('pause').disabled=!active&&!paused;$('pause').textContent=paused?'Continuar':'Pausar';$('difficulty').disabled=active||paused;$('badge').textContent=active?'MISSÃO WHITE NOW':paused?'PAUSA':'SORRISO EM JOGO';updateMusic();}
function showTip(index){const tip=tips[index%tips.length];$('tip-label').textContent=tip[0];$('tip').textContent=tip[1];}
function start(){state=engine.create();state.status='playing';last=performance.now();showTip(0);sync();render();$('announcement').textContent='Partida iniciada. Fique dentro do dente. Use as setas ou WASD.';}
function pause(){if(state.status==='playing'){state.status='paused';$('title').textContent='Uma pausa para sorrir';$('message').textContent='Sua missão continua de onde parou.';$('start').textContent='Continuar';}else if(state.status==='paused'){state.status='playing';last=performance.now();}sync();}
function finish(){if(state.status==='over')play(overAudio);$('title').textContent=state.status==='won'?'Missão completa!':'Vamos tentar de novo?';$('message').textContent=state.status==='won'?'12 obstáculos capturados! Agora conheça o produto e responda ao mini quiz abaixo.':`Você capturou ${state.score} de ${engine.GOAL} obstáculos. Fique dentro do dente e evite seu rastro.`;$('start').textContent='Jogar de novo';$('announcement').textContent=$('message').textContent;sync();$('start').focus({preventScroll:true});}
function frame(now){if(state.status==='playing'&&now-last>=1000/Math.min(14,Number($('difficulty').value)+Math.floor(state.score/4))){last=now;const previous=state.score;engine.step(state);if(state.score>previous){play(foodAudio);showTip(state.score-1);if(state.score>best){best=state.score;try{localStorage.setItem('white-now-best',String(best));}catch{}}$('announcement').textContent=`${state.score} de ${engine.GOAL} obstáculos coletados.`;}render();if(state.status==='over'||state.status==='won')finish();}requestAnimationFrame(frame);}
$('start').addEventListener('click',()=>state.status==='paused'?pause():start());$('restart').addEventListener('click',start);$('pause').addEventListener('click',pause);
$('sound').addEventListener('click',()=>{enabled=!enabled;$('sound').textContent=enabled?'Som: ligado':'Som: desligado';$('sound').setAttribute('aria-pressed',String(enabled));updateMusic();});
const keys={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};
window.addEventListener('keydown',event=>{if(event.target.matches('select,input,textarea')||document.querySelector('dialog[open]'))return;const direction=keys[event.key]||keys[event.key.toLowerCase()];if(direction){event.preventDefault();engine.turn(state,direction);}else if(event.code==='Space'&&!event.target.matches('button,a')){event.preventDefault();if(!event.repeat)pause();}else if(event.key==='Escape'&&state.status==='playing')pause();});
document.querySelectorAll('[data-dir]').forEach(button=>button.addEventListener('click',()=>engine.turn(state,button.dataset.dir)));
$('board').addEventListener('pointerdown',event=>{touchStart={x:event.clientX,y:event.clientY};$('board').setPointerCapture(event.pointerId);});
$('board').addEventListener('pointerup',event=>{if(!touchStart)return;const dx=event.clientX-touchStart.x,dy=event.clientY-touchStart.y;touchStart=null;if(Math.max(Math.abs(dx),Math.abs(dy))<15)return;engine.turn(state,Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up');});
$('board').addEventListener('pointercancel',()=>touchStart=null);document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.status==='playing')pause();});
function openDialog(id){if(state.status==='playing')pause();$(id).showModal();}
$('quiz-open').addEventListener('click',()=>{ $('quiz-result').textContent='';openDialog('quiz-dialog');});$('coupon-open').addEventListener('click',()=>openDialog('coupon-dialog'));
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>$(button.dataset.close).close()));
document.querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{$('quiz-result').textContent=button.dataset.answer==='right'?'Isso mesmo! A coleta é fictícia. Efeito óptico não trata cáries existentes.':'Vamos rever: a coleta é uma metáfora. Cáries reais precisam de avaliação odontológica.';}));
render();sync();requestAnimationFrame(frame);
