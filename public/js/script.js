console.log("script loaded");

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

//impove button by ai
document.getElementById("improveBtn").addEventListener("click", async () => {
  const btn = document.getElementById("improveBtn");

  btn.disabled = true;
  btn.innerText = "Generating...";
  const draft = document.getElementById("content").value;

  const response = await fetch("/blogs/ai/rewrite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ draft }),
  });

  const data = await response.json();

  document.getElementById("content").value = data.result;
  btn.disabled = false;
  btn.innerText = "Improve with AI";
});

// document.getElementById("improveBtn").addEventListener("click", async () => {
//   console.log("Button clicked");

//   try {
//     const draft = document.getElementById("content").value;

//     const response = await fetch("/blogs/ai/rewrite", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ draft }),
//     });

//     console.log("Response received");
//     console.log(response);

//     const text = await response.text();

//     console.log("Server returned:");
//     console.log(text);
//   } catch (err) {
//     console.error("ERROR:");
//     console.error(err);
//   }
// });
