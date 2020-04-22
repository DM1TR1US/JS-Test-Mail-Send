let answPart = 0;
let answSum = 0;

function drawResults(){
  let question = document.getElementById('questionSection');
  let results = document.getElementById('resultsSection');
  question.style.display = 'none';
  results.style.display = 'flex';

  let first = document.getElementById('cholerist');
  let second = document.getElementById('sangvinist');
  let third = document.getElementById('flegmatist');
  let fourth = document.getElementById('melanholist');

  first.innerHTML = (Math.round((localStorage.getItem('Part1')/localStorage.getItem('AllAnswersSum'))*100))+ '%';
  second.innerHTML = (Math.round((localStorage.getItem('Part2')/localStorage.getItem('AllAnswersSum'))*100))+ '%';
  third.innerHTML = (Math.round((localStorage.getItem('Part3')/localStorage.getItem('AllAnswersSum'))*100))+ '%';
  fourth.innerHTML = (Math.round((localStorage.getItem('Part4')/localStorage.getItem('AllAnswersSum'))*100))+ '%';

  document.getElementById('valChol').value = Math.round((localStorage.getItem('Part1')/localStorage.getItem('AllAnswersSum'))*100)+ '%';
  document.getElementById('valSang').value = Math.round((localStorage.getItem('Part2')/localStorage.getItem('AllAnswersSum'))*100)+ '%';
  document.getElementById('valFleg').value = Math.round((localStorage.getItem('Part3')/localStorage.getItem('AllAnswersSum'))*100)+ '%';
  document.getElementById('valMelan').value = Math.round((localStorage.getItem('Part4')/localStorage.getItem('AllAnswersSum'))*100)+ '%';
}

function drawQuestion(num){
  let place = document.getElementById('textPlace');
  let partPlace = document.getElementById('partPlace')
  let pos = 0;

  let part;

    part = tests[num].part;
    if(partPlace.innerHTML !== `Частина ${part}/4`){
        localStorage.setItem(`Part${part-1}`, answPart);
        answPart = 0;
        partPlace.innerHTML = `Частина ${part}/4`;
      }
    document.getElementById('qNumber').innerHTML = `${num+1}/80`;

    place.innerHTML = tests[num].text;

}

function takeAnswer(){
  let pos = document.getElementById('btnYes');
  let neg = document.getElementById('btnNo');
  let i = 0;

  drawQuestion(i);

  pos.onclick = function(){
    let elem = document.getElementById('textPlace');
    answPart++;
    answSum++;
    i++;
      if(i === tests.length){
        localStorage.setItem('AllAnswersSum', answSum);
        localStorage.setItem(`Part${4}`, answPart);
        drawResults();
      }else{
        drawQuestion(i);
      }
    }
  neg.onclick = function(){
    let elem = document.getElementById('textPlace');
    i++;
      if(i === tests.length){
        localStorage.setItem('AllAnswersSum', answSum);
        localStorage.setItem(`Part${4}`, answPart);
        drawResults();
      }else{
        drawQuestion(i);
      }
    }
}

if(localStorage.getItem('Part1') && localStorage.getItem('Part2') && localStorage.getItem('Part3') && localStorage.getItem('Part4')){
  drawResults();
}else {
  takeAnswer();
}
