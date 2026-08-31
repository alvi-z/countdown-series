/* =========================================================
   THE WEEK OF ALBAB — FROGGY'S LITTLE GUIDE
   JAVASCRIPT
========================================================= */


/* =========================================================
   DAY LINKS
========================================================= */

const DAY_LINKS = {
  1: "https://alvi-z.github.io/Day-1/",
  2: "https://alvi-z.github.io/Day-2/",
  3: "https://alvi-z.github.io/Day-3/",
  4: "https://alvi-z.github.io/Day-4/",
  5: "https://alvi-z.github.io/Day-5/",
  6: "https://alvi-z.github.io/Day-6/",
  7: "https://alvi-z.github.io/Day-7/",
  8: "https://alvi-z.github.io/Day-8/"
};


/* =========================================================
   PASSWORDS
========================================================= */

const DAY_PASSWORDS = {
  1: "marshmallow0",
  2: "music04",
  3: "kitty1",
  4: "stars4",
  5: "cotton2",
  6: "sunflower7",
  7: "strawberry1",
  8: "adventure8"
};


/* =========================================================
   STATE
========================================================= */

let selectedDay = null;


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(screenId) {

  const screens = document.querySelectorAll(".screen");

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(screenId);

  if (!target) {
    console.error("Screen not found:", screenId);
    return;
  }

  target.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   FROGGY — SAY HI
========================================================= */

function sayHi() {

  const response =
    document.getElementById("froggyResponse");

  if (!response) {
    console.error("Froggy response not found.");
    return;
  }

  response.classList.remove("hidden");

  setTimeout(() => {
    response.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 100);
}


/* =========================================================
   ENTER THE HOMEPAGE
========================================================= */

function enterHome() {
  showScreen("homeScreen");
}


/* =========================================================
   OPEN DAY
========================================================= */

function openDay(dayNumber) {

  if (!DAY_LINKS[dayNumber]) {
    console.error("No link found for Day", dayNumber);
    return;
  }

  if (!DAY_PASSWORDS[dayNumber]) {
    console.error("No password found for Day", dayNumber);
    return;
  }

  selectedDay = dayNumber;


  /* Reset password field */

  const input =
    document.getElementById("passwordInput");

  if (input) {
    input.value = "";
  }


  /* Hide old error */

  const error =
    document.getElementById("passwordError");

  if (error) {
    error.classList.add("hidden");
  }


  /* Update modal */

  const prompt =
    document.getElementById("passwordPrompt");

  if (prompt) {

    prompt.textContent =
      "Froggy has locked Day " +
      dayNumber +
      ". Enter the secret password to unlock it.";

  }


  /* Show modal */

  const modal =
    document.getElementById("passwordModal");

  if (!modal) {
    console.error("Password modal not found.");
    return;
  }

  modal.classList.remove("hidden");


  /* Focus password field */

  setTimeout(() => {

    if (input) {
      input.focus();
    }

  }, 150);

}


/* =========================================================
   CLOSE PASSWORD MODAL
========================================================= */

function closePasswordModal() {

  const modal =
    document.getElementById("passwordModal");

  if (modal) {
    modal.classList.add("hidden");
  }

  selectedDay = null;


  const input =
    document.getElementById("passwordInput");

  if (input) {
    input.value = "";
  }


  const error =
    document.getElementById("passwordError");

  if (error) {
    error.classList.add("hidden");
  }

}


/* =========================================================
   UNLOCK DAY
========================================================= */

function checkPassword(event) {

  /*
     IMPORTANT:
     Prevent the browser from refreshing
     the CodePen page when the form submits.
  */

  if (event) {
    event.preventDefault();
  }


  /* Make sure a day has actually been selected */

  if (selectedDay === null) {

    console.error("No day has been selected.");

    return false;

  }


  const input =
    document.getElementById("passwordInput");

  const error =
    document.getElementById("passwordError");


  if (!input) {

    console.error("Password input not found.");

    return false;

  }


  const enteredPassword =
    input.value.trim();

  const correctPassword =
    DAY_PASSWORDS[selectedDay];


  /* =======================================================
     CORRECT PASSWORD
  ======================================================= */

  if (
    enteredPassword ===
    correctPassword
  ) {

    /*
       Get the destination BEFORE
       clearing selectedDay.
    */

    const destination =
      DAY_LINKS[selectedDay];


    /*
       Close modal.
    */

    const modal =
      document.getElementById("passwordModal");

    if (modal) {
      modal.classList.add("hidden");
    }


    /*
       Small delay so the modal can
       visibly disappear before navigation.
    */

    setTimeout(() => {

      window.location.assign(destination);

    }, 100);


    return false;

  }


  /* =======================================================
     WRONG PASSWORD
  ======================================================= */

  if (error) {

    error.textContent =
      "Hmm... that's not the password. Try again! 🐸";

    error.classList.remove("hidden");

  }


  /*
     Shake password box.
  */

  const box =
    document.querySelector(".password-box");

  if (box) {

    box.animate(

      [
        {
          transform: "translateX(0)"
        },

        {
          transform: "translateX(-7px)"
        },

        {
          transform: "translateX(7px)"
        },

        {
          transform: "translateX(-6px)"
        },

        {
          transform: "translateX(6px)"
        },

        {
          transform: "translateX(0)"
        }
      ],

      {
        duration: 400,
        easing: "ease-in-out"
      }

    );

  }


  /*
     Clear incorrect password.
  */

  input.value = "";

  input.focus();


  return false;

}


/* =========================================================
   MODAL BACKDROP
========================================================= */

document.addEventListener("click", function(event) {

  const modal =
    document.getElementById("passwordModal");

  if (!modal) {
    return;
  }


  /*
     Clicking the dark area outside
     the password box closes it.
  */

  if (event.target === modal) {

    closePasswordModal();

  }

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", function(event) {

  if (event.key !== "Escape") {
    return;
  }

  const modal =
    document.getElementById("passwordModal");

  if (
    modal &&
    !modal.classList.contains("hidden")
  ) {

    closePasswordModal();

  }

});


/* =========================================================
   ENTER KEY
========================================================= */

document.addEventListener("keydown", function(event) {

  if (event.key !== "Enter") {
    return;
  }


  const modal =
    document.getElementById("passwordModal");

  if (
    !modal ||
    modal.classList.contains("hidden")
  ) {

    return;

  }


  /*
     If the password modal is open,
     pressing Enter should unlock it.
  */

  event.preventDefault();

  checkPassword(event);

});


/* =========================================================
   PREVENT DOUBLE-TAP ZOOM ON BUTTONS
========================================================= */

document.addEventListener(
  "dblclick",
  function(event) {

    if (
      event.target.closest("button")
    ) {

      event.preventDefault();

    }

  },
  {
    passive: false
  }
);


/* =========================================================
   PREVENT IMAGE DRAGGING
========================================================= */

document.addEventListener(
  "dragstart",
  function(event) {

    if (
      event.target.tagName === "IMG"
    ) {

      event.preventDefault();

    }

  }
);


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    /*
       Start on the lock screen.
    */

    const screens =
      document.querySelectorAll(".screen");


    screens.forEach(screen => {
      screen.classList.remove("active");
    });


    const lockScreen =
      document.getElementById("lockScreen");


    if (lockScreen) {
      lockScreen.classList.add("active");
    }


    /*
       IMPORTANT:
       Do NOT set the password form
       to method="dialog".

       That was unnecessary and could
       interfere with CodePen's form
       behavior.
    */

    const passwordForm =
      document.getElementById("passwordForm");


    if (passwordForm) {

      passwordForm.addEventListener(
        "submit",
        checkPassword
      );

    }


    /*
       Make normal buttons type="button".
    */

    document
      .querySelectorAll("button")
      .forEach(button => {

        /*
           Do not overwrite the
           password submit button.
        */

        if (
          button.form &&
          button.form.id === "passwordForm"
        ) {

          return;

        }

        button.type = "button";

      });

  }
);
