var lang = "en";

function toggleDiv(x) {
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

async function fetchTranslation(ques, id) {
  await fetch("/translate", {
    method: "POST",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: [`${ques}`], source: "en", target: lang }),
  }).then((data) => {
    // console.log(data.text());
    if (data.ok) {
      // $(id).text(data.text());
      Promise.resolve(data.text()).then(function (value) {
        $(id).text(value);
      });
    }

    return data;
  });
}

function translateFn() {
  var dropd = document.getElementById("lang");
  lang = dropd.options[dropd.selectedIndex].value;

  var x = document.getElementById("hidden1");
  var ques = document.getElementById("firstq").textContent;
  fetchTranslation(ques, "#hidden1");
  toggleDiv(x);

  var x = document.getElementById("hidden2");
  var ques = document.getElementById("secondq").textContent;
  fetchTranslation(ques, "#hidden2");
  toggleDiv(x);

  var x = document.getElementById("hidden3");
  var ques = document.getElementById("thirdq").textContent;
  fetchTranslation(ques, "#hidden3");
  toggleDiv(x);

  var x = document.getElementById("hidden4");
  var ques = document.getElementById("forthq").textContent;
  fetchTranslation(ques, "#hidden4");
  toggleDiv(x);

  var x = document.getElementById("hidden5");
  var ques = document.getElementById("fifthq").textContent;
  fetchTranslation(ques, "#hidden5");
  toggleDiv(x);
}
