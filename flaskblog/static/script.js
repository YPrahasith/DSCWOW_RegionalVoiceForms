try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
}

var noteTextarea1 = $("#note-textarea1");
var noteTextarea2 = $("#note-textarea2");
var noteTextarea3 = $("#note-textarea3");
var noteTextarea4 = $("#note-textarea4");
var noteTextarea5 = $("#note-textarea5");
var startcntr = 1;
var noteContent = "";

/*-----------------------------
        Voice Recognition 
  ------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses.
recognition.continuous = true;

// This block is called every time the Speech APi captures a line.
recognition.onresult = function (event) {
  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far.
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  //var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  //if(!mobileRepeatBug) {
  noteContent += transcript;
  if (startcntr == 1) {
    noteTextarea1.val(noteContent);
    noteTextarea1.on("input", function () {
      noteContent = $(this).val();
    });
    var msg1 = new SpeechSynthesisUtterance(
    document.getElementById("hidden2").textContent
    );
    window.speechSynthesis.speak(msg1);
  } else if (startcntr == 2) {
    noteTextarea2.val(noteContent);
    noteTextarea2.on("input", function () {
      noteContent = $(this).val();
    });
    var msg2 = new SpeechSynthesisUtterance(
    document.getElementById("hidden3").textContent
    );
    window.speechSynthesis.speak(msg2);
  } else if (startcntr == 3) {
    noteTextarea3.val(noteContent);
    noteTextarea3.on("input", function () {
      noteContent = $(this).val();
    });
    var msg3 = new SpeechSynthesisUtterance(
    document.getElementById("hidden4").textContent
    );
    window.speechSynthesis.speak(msg3);
  } else if (startcntr == 4) {
    noteTextarea4.val(noteContent);
    noteTextarea4.on("input", function () {
      noteContent = $(this).val();
    });
    var msg4 = new SpeechSynthesisUtterance(
    document.getElementById("hidden5").textContent
    );
    window.speechSynthesis.speak(msg4);
  } else if (startcntr == 5) {
    noteTextarea5.val(noteContent);
    noteTextarea5.on("input", function () {
      noteContent = $(this).val();
    });
    recognition.stop();
  }
  startcntr = startcntr + 1;
  noteContent = "";
  transcript = "";
  // }
};

recognition.onstart = function () {};

recognition.onspeechend = function () {};

recognition.onerror = function (event) {
  if (event.error == "no-speech") {
    //instructions.text('No speech was detected. Try again.');
  }
};

/*-----------------------------
        App buttons and input 
  ------------------------------*/

$("#lang").on("click", function (e) {
  if (startcntr == 1) {
    var msg = new SpeechSynthesisUtterance(
      document.getElementById("hidden1").textContent
    );
    window.speechSynthesis.speak(msg);
  }
  if (noteContent.length) {
    noteContent += " ";
  }
  var dropd = document.getElementById("lang");
  lang = dropd.options[dropd.selectedIndex].value;
  recognition.lang=lang;
  

  recognition.start();

  noteContent = "";
  transcript = "";
});
