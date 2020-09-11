var sec = 1
var min = 1
var mots = [" "]

var good = []
var lettreCpt = -1;
var motCpt = 1;
var active = false;
function chrono(){
  active = true;
	sec=sec-1;
	if (sec==-1){
		min--; sec=59;
	}
	document.getElementById("chrono").innerHTML = (min.toString().length < 1 ? '' : '0') + min + ":" + (sec > 10 ? '' : '0') + sec;
  if (min!=0 || (min==0 && sec!=0)) setTimeout("chrono()", 1000);
  if (min == 0 && sec == 0 ) 
  {
    setTimeout("finchrono()", 1000);
  }
}

function finchrono()
{
  
  document.getElementById("secondPart").classList.add("animationSecondPartRetour");
  setTimeout("finchronoSuite()", 1000);
}
function finchronoSuite()
{
  document.getElementById("startRow").classList.add("animationFadeRetour");
  setTimeout("deleteAnimation()", 1000);
}
function deleteAnimation()
{
  sec = 1;
  min = 1;
  lettreCpt = -1;
  motCpt = 1;
  good=[];
  shuffle(mots);
  active=false;
  document.getElementById('first').innerHTML = mots[0];
  document.getElementById('second').innerHTML = mots[1];
  document.getElementById('third').innerHTML = mots[2];
  document.getElementById("secondPart").classList.remove("animationSecondPartRetour");
  document.getElementById("secondPart").classList.remove("animationSecondPart");
  document.getElementById("startRow").classList.remove("animationFadeRetour");
  document.getElementById("startRow").classList.remove("animationFade");
  
}

var request = new XMLHttpRequest()

request.open('GET', 'https://raw.githubusercontent.com/words/an-array-of-french-words/master/index.json', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  
  if (request.status >= 200 && request.status < 400) {
	for (let i = 0 ; i < data.length-1 ; i++ ) {
    mots.push( data[i+1].normalize("NFD").replace(/[\u0300-\u036f]/g, "") ); }
  } else {
    console.log('error')
  }
  shuffle(mots);
  document.getElementById('first').innerHTML = mots[0];
  document.getElementById('second').innerHTML = mots[1];
  document.getElementById('third').innerHTML = mots[2];
}

request.send()

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}



document.getElementById("startBtn").addEventListener("click", function() {
    //$("#startRow").css("opacity","0");    
    
    document.getElementById("startRow").classList.add("animationFade");
    
    setTimeout(suiteTraitement, 1000);
  }); 

function suiteTraitement()
{
  document.getElementById("secondPart").classList.add("animationSecondPart");
}




document.addEventListener('keydown', logKey);

function logKey(e) {  
  if ( $( "#startRow" ).hasClass( "animationFade" ) )
  {
    if (active==false ) chrono();
    var sRep = "";
    var element = document.querySelector('#second');
    if (e.key == "Backspace")
    {
      if ( lettreCpt>-1 )
      {
        good.splice(-1,1);    
        lettreCpt--;
      }
    }
    else
    {
      if ( mots[motCpt].charAt(lettreCpt+1) == e.key)
        good.push("yes");
      else
        good.push("no");
          
        
    lettreCpt++;
    }
    if (lettreCpt == mots[motCpt].length)
    {
      var element2 = document.querySelector('#first');
      element2.innerHTML = mots[motCpt];
      var element3 = document.querySelector('#third');
      element3.innerHTML = mots[motCpt+2 ];
      element.innerHTML = mots[motCpt+1];
      motCpt++;
      good = [];
      lettreCpt=-1;
    }
    else
    {
      for (let i = 0 ; i < lettreCpt+1 ; i++ )
            sRep += (good[i] == "yes" ? "<span class='written-good'>" : "<span class='written-bad'>" ) + mots[motCpt].charAt(i) + "</span>";

      for (let i = lettreCpt+1 ; i < mots[motCpt].length ; i++ )
          sRep += ( i == lettreCpt+1 ? "<span class='written-waiting'>" : "" ) + mots[motCpt].charAt(i) + "</span>" ;
      element.innerHTML = sRep;
    }
  }
  
}