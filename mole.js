const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-0"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-1"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-2"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-3"),
  },
  {
    status: "hungry",
    next: getHungryInterval(),
    king: false,
    node: document.querySelector("#hole-4"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-5"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-6"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-7"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-8"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-9"),
  },
];

let runAgainstAt = Date.now() + 100;

function nextFrame() {
  let now = Date.now();
  if (runAgainstAt <= now) {
    //only run this block if the variable runAgainstAt is less than or equal to the variable now by at least a 100 millisecond. In other words, now has to be incremented by a least 100 millisecond to get this block to run successfully.

    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        //mole[i].next === getInterval
        // console.log(moles[i].status);
        // console.log(`now: ${now} ||  next: ${moles[i].next}`);
        getNextStatus(moles[i]);
      }
    }

    runAgainst = now + 100;
  }
  requestAnimationFrame(nextFrame);
}

function getNextStatus(mole) {
  const getNodeChild = mole.node.children[0];
  //get image of node

  switch (mole.status) {
    case "sad":
      mole.status = "leaving";
      mole.next = getSadInterval();
      mole.king
        ? (getNodeChild.src = "./images/king-mole-leaving.png")
        : (getNodeChild.src = "./images/mole-leaving.png");
      break;

    case "leaving":
      mole.status = "gone"; //change status to gone
      mole.next = getGoneInterval(); //how much time to stay as gone
      getNodeChild.classList.add("gone"); //add gone class to node
      break;

    case "gone":
      mole.status = "hungry";
      mole.king = getKingStatus(); //adjusts king boolean status 
      mole.next = getHungryInterval();
      getNodeChild.classList.add("hungry");
      getNodeChild.classList.remove("gone");
      mole.king
        ? (getNodeChild.src = "./images/king-mole-hungry.png")
        : (getNodeChild.src = "./images/mole-hungry.png");
      break;

    case "hungry":
      mole.status = "sad";
      getNodeChild.next = getSadInterval();
      getNodeChild.classList.remove("hungry");

      mole.king
        ? (getNodeChild.src = "./images/king-mole-sad.png")
        : (getNodeChild.src = "./images/mole-sad.png");
      break;

    case "fed":
      mole.status = "leaving";
      mole.next = getSadInterval();
      getNodeChild.src = "./images/mole-leaving.png";
      mole.king
        ? (getNodeChild.src = "./images/king-mole-leaving.png")
        : (getNodeChild.src = "./images/mole-leaving.png");
      break;
  }
}

function getSadInterval() {
  return Date.now() + 1000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

let score = 0;
const MAX_SCORE = 10;

function getKingStatus() {
  return Math.random() > 0.9;
  //returns a bolean
  //returns false 90% of the time because Math.random returns a pseudo random rumber between 0 and 1
}

function feed(event) {
  // if ( event.target.tagName !== "IMG" || !event.target.classList.contains( "hungry" ) ) {
  //     return;
  // }

  if (!event.target.classList.contains("hungry")) {
    return;
  }
  //the class "hungry" was/is added directly to the img tag. so if event.target.classList.contains("hungry") is true, then an image was clicked on

  //only continue if event.target contains a class of hungry else do nothing (return)

  //   console.log(event.target);
  //     console.log( event.currentTarget );

  const mole = moles[parseInt(event.target.dataset.index)];

  mole.status = "fed";
  mole.next = getSadInterval();

  if (mole.king) {
    score += 2;
    mole.node.children[0].src = "./images/king-mole-fed.png";
  } else {
    score++;
    mole.node.children[0].src = "./images/mole-fed.png";
  }
  //   mole.king ? (score += 2) : score++;

  mole.node.children[0].classList.remove("hungry");
  if (score >= 10) {
    win();
  }
  document.querySelector(".worm-container").style.width = `${
    (score / MAX_SCORE) * 100
  }%`;
}

function win() {
  document.querySelector(".bg").classList.add("hide");
  document.querySelector(".win").classList.remove("hide");
}

document.querySelector(".bg").addEventListener("click", feed);

nextFrame();

//TODO: Total score, number of futile clicks, number of sucessful clicks, time taken to complete
