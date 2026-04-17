$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton);
  
    
  })

      // Start background music on first user interaction (browser autoplay policy)
      $(document).one('click', function() {
        var music = document.getElementById('bg-music');
        music.play();
      });


      // Declare growl sound outside so it's always accessible
      var growlSound = new Audio('audio/DogGrowl.mp3');
      growlSound.loop = true;

      // ---- .hover() ----
      // .hover(funcA, funcB) is a jQuery shortcut for listening to two mouse events on an element:
      //   funcA runs on "mouseenter" — when the user's cursor moves ONTO the element
      //   funcB runs on "mouseleave" — when the cursor moves OFF the element
      // Here we attach it to the pet image so the zombie dog reacts when you hover over it.
      // Syntax: $(selector).hover( handlerIn, handlerOut )
      $('.pet-image').hover(
      function() {
        // --- mouseenter handler ---
        // Fires the moment the cursor enters the pet image area
        growlSound.currentTime = 0; // reset audio to the beginning so it always starts fresh
        growlSound.play();          // plays the growl sound while hovering
        $('.pet-message').text("*Growls* Don't touch me HUMAN...");
      },
      function() {
        // --- mouseleave handler ---
        // Fires the moment the cursor leaves the pet image area
        $('.pet-message').text(""); // clears the speech bubble
        growlSound.pause();         // stops the growl sound
      }
      // ---- .hover() ----
    );
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    // Added energy:10 as a new stat tracked and updated by nap/exercise buttons
    var pet_info = {name:"Bacon", weight:120, happiness:8, energy:10};
  

    function clickedTreatButton() {
      // Play a laugh sound effect when the treat button is clicked
      var sound = new Audio('audio/TBLaugh.mp3');
      sound.play();
      // Increase pet happiness
      pet_info.happiness += 1;
      // Increase pet weight
      pet_info.weight += 3;
      $('.pet-message').text("Yum! That was delicious! Woof!");

      // ---- .addClass()  ----
      // .addClass('spin') adds the CSS class "spin" to the pet image element.
      // The "spin" class is defined in style.css and has a @keyframes animation attached to it,
      // so adding it instantly starts the spinning animation on the dog.
      // .removeClass() is called after 2500ms (via setTimeout) to remove the class —
      // this resets the animation so it can fire again the next time Treat is clicked.
      $('.pet-image').addClass('spin');
      setTimeout(function() {
        $('.pet-image').removeClass('spin');
      }, 2500);

      // ---- .addClass()  ----
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Play a zombie scream sound effect when the play button is clicked
      var sound = new Audio('audio/zombiescream.mp3');
      sound.play();
      // Increase pet happiness
      pet_info.happiness += 2;
      // Decrease pet weight
      pet_info.weight -= 1;
      $('.pet-message').text("Woof! That was so fun! Let's do it again!");

      $('.pet-image').addClass('bounce');
      setTimeout(function() {
        $('.pet-image').removeClass('bounce');
      }, 2500);

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Play a "yeaaas" zombie sound when the exercise button is clicked
      var sound = new Audio('audio/zombiesyeaaaas.mp3');
      sound.play();
      // Decrease pet happiness
      pet_info.happiness -= 2;
      // Decrease pet weight
      pet_info.weight -= 3;
      $('.pet-message').text("*panting* I need a nap... That was exhausting!");

      $('.pet-image').addClass('shake');
      setTimeout(function() {
        $('.pet-image').removeClass('shake');
      }, 400);
      checkAndUpdatePetInfoInHtml();
    }

    function clickedNapButton() {
      // Play a snoring sound when the nap button is clicked
      var sound = new Audio('audio/zombiesnore.mp3');
      sound.play();
      // Increase pet happiness
      pet_info.happiness += 1;
      pet_info.energy += 5;
      $('.pet-message').text("Zzz... I feel refreshed! Let's play!");

      $('.pet-image').addClass('pulse');
      setTimeout(function() {
        $('.pet-image').removeClass('pulse');
      }, 7100); // 1.7s x 5 = 5.1s to match 1.7s x 5 plays

      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
      }
      // Add conditional so if happiness is lower than zero.
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }
        if (pet_info.energy < 0) {
          pet_info.energy = 0;
        }
    }


    // Mute button: toggles background music on/off and updates button label accordingly
    $('.mute-button').click(function() {
      var music = document.getElementById('bg-music');
      if (music.muted) {
        music.muted = false;
        $('.mute-button').text('Mute');
      } else {
        music.muted = true;
        $('.mute-button').text('Unmute');
      }
    });
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.energy').text(pet_info['energy']);
    }

    
  