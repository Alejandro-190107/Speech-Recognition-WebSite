  const searchForm = document.querySelector("#search-form");

  const searchFormInput = searchForm.querySelector("input"); 

  const info = document.querySelector(".info");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 

  if(SpeechRecognition) {

    //console.log("Your Browser supports speech Recognition");
  
    const recognition = new SpeechRecognition();

    recognition.continuous = true;

    searchForm.insertAdjacentHTML("beforeend", '<button type="button" class="btn btn-dark"> <i class="fas fa-microphone"></i></button>');

    //searchFormInput.style.paddingRight = "50px";

    const micBtn = searchForm.querySelector("button");

    const micIcon = micBtn.firstElementChild;

    micBtn.addEventListener("click", micBtnClick);

    function micBtnClick() {

      if(micIcon.classList.contains("fa-microphone")) { 
        recognition.start(); 
      }

      else {
        recognition.stop();
      }
    }

    recognition.addEventListener("start", startSpeechRecognition);

    function startSpeechRecognition() {

      micIcon.classList.remove("fa-microphone");
      micIcon.classList.add("fa-microphone-slash");
      searchFormInput.focus();
      //console.log("Voice activated, SPEAK");

    }

    recognition.addEventListener("end", endSpeechRecognition);

    function endSpeechRecognition() {

      micIcon.classList.remove("fa-microphone-slash");
      micIcon.classList.add("fa-microphone");
      searchFormInput.focus();
      //console.log("Speech recognition service disconnected");
      
    }

    recognition.addEventListener("result", resultOfSpeechRecognition);

    function resultOfSpeechRecognition(event) {

      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
    
      if(transcript.toLowerCase().trim()==="detener") {

        recognition.stop();
      }

      else if(transcript.toLowerCase().trim()==="ayuda del sitio") {

        open("help.html");
      }

      else if(transcript.toLowerCase().trim()==="salir del sitio") {

        salir ();
      }
    
      else if(!searchFormInput.value) {

        searchFormInput.value = transcript;
      }

      else {

        if (transcript.toLowerCase().trim()==="busca múltiple") {

            window.open("https://www.sanborns.com.mx/resultados/q="+searchFormInput.value); /* WebSite Sanborns */
            window.open(" https://www.liverpool.com.mx/tienda?s="+searchFormInput.value); /* WebSite Liverpool */
            window.open("hhttps://www.sears.com.mx/resultados/q="+searchFormInput.value); /* WebSite Sears */
            window.open("https://www.suburbia.com.mx/tienda?s="+searchFormInput.value); /* WebSite Suburbia */
            window.open("https://www.officedepot.com.mx/officedepot/en/search/?text="+searchFormInput.value); /* WebSite OfficeDepot */

        }

        else if (transcript.toLowerCase().trim()==="sanborns") {
          open("https://www.sanborns.com.mx/resultados/q="+searchFormInput.value); /* WebSite Sanborns */
        }
        else if(transcript.toLowerCase().trim()==="liverpool") {
          open(" https://www.liverpool.com.mx/tienda?s="+searchFormInput.value); /* WebSite Liverpool */
        }
        else if(transcript.toLowerCase().trim()==="sears") {
          open("https://www.sears.com.mx/resultados/q="+searchFormInput.value); /* WebSite Sears */
        }
        else if(transcript.toLowerCase().trim()==="suburbia") {
          open("https://www.suburbia.com.mx/tienda?s="+searchFormInput.value); /* WebSite Suburbia */
        }
        else if(transcript.toLowerCase().trim()==="office depot") {
          open("https://www.officedepot.com.mx/officedepot/en/search/?text="+searchFormInput.value); /* WebSite OfficeDepot */
        }
        else if(transcript.toLowerCase().trim()==="borrar") {
          searchFormInput.value = "";
        } 
        else {
        searchFormInput.value = transcript;
        }
      }
    }
  }

  else {
    //console.log("Your Browser does not support speech Recognition");
    info.textContent = "Your Browser does not support Speech Recognition";
  }

  var question = true;

  window.alert = salir;

  function salir () {

    var answer;

    if (question) {

      answer = confirm ('Estas a punto de salir. ¿Seguro?');

      if (answer) {

        window.close();
      }

      } else {

      return false;

    }
  }