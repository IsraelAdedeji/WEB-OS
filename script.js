setInterval(function () {
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString()
}, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
    // Step 2: Set up variables to keep track of the element's position.
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    // Step 3: Check if there is a special header element associated with the draggable element.
    if (document.getElementById(element.id + "header")) {
        // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
        // This allows you to drag the window around by its header.
        document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
        // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
        // This allows you to drag the window by holding down anywhere on the window.
        element.onmousedown = startDragging;
    }

    // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        // Step 7: Get the mouse cursor position at startup.
        initialX = e.clientX;
        initialY = e.clientY;
        // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        // Step 10: Calculate the new cursor position.
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var welcomeScreen = document.querySelector("#welcome")

function closeWindow(element) {
    element.style.display = "none"
}

function openWindow(element) {
    element.style.display = "flex"
}

var welcomeScreenClose = document.querySelector("#welcomeClose")

var welcomeScreenOpen = document.querySelector("#welcomeOpen")

welcomeScreenClose.addEventListener("click", function () {
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function () {
    openWindow(welcomeScreen);
});

var selectedIcon = undefined

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element
}

function deselectIcon(element) {
    if (element) {
        element.classList.remove("selected");
        selectedIcon = undefined
    }
}

function handleIconTap(iconElement, windowElement) {
    // if (element.classList.contains("selected")) {
    //     deselectIcon(element)
    //     openWindow(window)
    // } else {
    //     selectIcon(element)
    // }

    if (iconElement.classList.contains("selected")) {
        deselectIcon(iconElement);
    } else {
        deselectIcon(selectedIcon);
        selectIcon(iconElement);
        openWindow(windowElement);
    }
}

dragElement(document.querySelector("#goldenRecord"))

var goldenRecord = document.querySelector("#goldenRecord")

var goldenRecordClose = document.querySelector("#goldenRecordClose")

var goldenRecordOpen = document.querySelector("#goldenRecordOpen")

goldenRecordOpen.addEventListener("click", () => openWindow(goldenRecord));

goldenRecordClose.addEventListener("click", () => closeWindow(goldenRecord));

var biggestIndex = 1;

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}

// function handleWindowTap(element) {
//     biggestIndex++;  // Increment biggestIndex by 1
//     element.style.zIndex = biggestIndex;
// }

// function openWindow(element) {
//     element.style.display = "flex";
//     biggestIndex++;  // Increment biggestIndex by 1
//     element.style.zIndex = biggestIndex;
// }

addWindowTapHandling(welcomeScreen)
addWindowTapHandling(goldenRecord)

var topBar = document.querySelector("#top")

function openWindow(element) {
    element.style.display = "flex";
    biggestIndex++;  // Increment biggestIndex by 1
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}

function handleWindowTap(element) {
    biggestIndex++;  // Increment biggestIndex by 1
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
    deselectIcon(selectedIcon)
}

function initializeWindow(elementName) {
    var screen = document.querySelector("#" + elementName);
    var closeBtn = document.querySelector("#" + elementName + "Close");

    if (screen) {
        addWindowTapHandling(screen);
        dragElement(screen);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => closeWindow(screen));
    }

    if (elementName !== "welcome") {
        var icon = document.querySelector("#" + elementName + "Open");
        if (icon) {
            icon.addEventListener("click", () => handleIconTap(icon, screen));
        }
    }
}

// function initializeIcon(elementName) {
//     var icon = document.querySelector("#" + elementName + "Open");
//     var screen = document.querySelector("#" + elementName);

//     icon.addEventListener("click", () => handleIconTap(icon, screen));
// }

initializeWindow("goldenRecord")

var content = [
    {
        title: "System Welcome",
        date: "10/24/2026",
        content: `
            <div style="text-align: center;">
                <h2 style="color: #8a2be2; margin-bottom: 5px;">Welcome to SpaceOS</h2>
                <p style="font-size: 12px; color: #666; margin-top: 0;">Version 1.0</p>
            </div>
            <p contenteditable="true">
                <span contenteditable="true">Congratulations, Captain. You have successfully booted up <strong>SpaceOS</strong>. 
                <br><br>
                This terminal is your personal database for deep-space exploration. You can click into any text block and <ins>type directly</ins> to record your findings.</span>
            </p>
            <blockquote style="background-color: #F9F9F9; margin-top: 16px; margin-bottom: 16px; margin-left: 0px; margin-right: 0px; padding: 16px; border-radius: 16px; border-left: 4px solid #8a2be2;" contenteditable="true">
                <i>"The universe is under no obligation to make sense to you."<br>~ Neil deGrasse Tyson</i>
            </blockquote>
            <span contenteditable="true">
                Use the sidebar on the left to navigate your records. Check out the <strong>Captain's Log</strong> to see a sample entry.
            </span>
        `
    },
    
    {
        title: "Captain's Log",
        date: "10/24/2026",
        content: `
            <h2 style="color: #8a2be2; margin-bottom: 5px;">Stardate: 2026.10.24</h2>
            <p contenteditable="true">
                <span contenteditable="true">Today we successfully deployed the new navigation array. The system is running smoothly, and we are currently orbiting the <strong>Golden Record</strong> nebula.</span>
            </p>
            <img src="images/imgi_134_default.webp" 
                style="width: 100%; border-radius: 12px; margin: 10px 0;">
            <p contenteditable="true">
                <span contenteditable="true">We captured a visual of the Pillars of Creation. I have logged the following tasks for tomorrow:</span>
            </p>
            <ul contenteditable="true">
                <li>Recalibrate the solar sensors</li>
                <li>Check the oxygen scrubbers</li>
                <li>Explore the outer rim</li>
            </ul>
            <blockquote style="background-color: #F9F9F9; margin-top: 16px; margin-bottom: 16px; padding: 16px; border-radius: 16px;" contenteditable="true">
                <i>End of Record.</i>
            </blockquote>
        `
    },

    {
        title: "Project Ideas",
        date: "09/18/2026",
        content: `
            <h2>My Next Big Project</h2>
            <p contenteditable="true">I want to build a custom mechanical keyboard.</p>
            <ul>
                <li>Select parts</li>
                <li>Print the case</li>
                <li>Build the firmware</li>
            </ul>
        `
    }
]

function setNotesContent(index) {

    var notesContent = document.querySelector("#notesContent");

    var selectedNote = content[index];

    notesContent.innerHTML = selectedNote.content;
}

setNotesContent(0)

var sidebar = document.querySelector("#sidebar");

function addToSideBar(index) {
    var note = content[index];
    var newDiv = document.createElement("div");

    newDiv.style.padding = "10px";
    newDiv.style.marginBottom = "5px";
    newDiv.style.borderRadius = "10px";
    newDiv.style.cursor = "pointer";
    newDiv.style.backgroundColor = "#e0e0e0";

    newDiv.innerHTML = `
    <p style= "margin: 0px; font-weight: bold;">${note.title}</p>
    <p style= "margin: 0px; font-size: 12px;">${note.date}</p>
    `;

    newDiv.addEventListener("click", function () {
        setNotesContent(index);
    });

    sidebar.appendChild(newDiv);
}

for (let i = 0; i < content.length; i++) {
    addToSideBar(i);
}

initializeWindow("solar");

var planets = [
    {
        name: "Mercury",
        type: "Terrestrial",
        distance: "57.9 million km",
        diameter: "4,879 km",
        fact: "Mercury is the smallest planet and the closest to the Sun. It has a heavily cratered surface.",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg"
    },
    {
        name: "Venus",
        type: "Terrestrial",
        distance: "108.2 million km",
        diameter: "12,104 km",
        fact: "Venus is the hottest planet in our solar system with a surface temperature of over 450°C.",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Venus_globe.jpg"
    },
    {
        name: "Earth",
        type: "Terrestrial",
        distance: "149.6 million km",
        diameter: "12,742 km",
        fact: "Earth is the only planet known to support life, with liquid water covering 71% of its surface.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
    },
    {
        name: "Mars",
        type: "Terrestrial",
        distance: "227.9 million km",
        diameter: "6,779 km",
        fact: "Mars is known as the Red Planet because iron minerals in the soil oxidize (rust).",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg"
    },
    {
        name: "Jupiter",
        type: "Gas Giant",
        distance: "778.5 million km",
        diameter: "139,820 km",
        fact: "Jupiter is the largest planet. Its Great Red Spot is a storm larger than Earth that has raged for centuries.",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg"
    },
    {
        name: "Saturn",
        type: "Gas Giant",
        distance: "1.4 billion km",
        diameter: "116,460 km",
        fact: "Saturn's stunning rings are made mostly of ice chunks. It is so light it could float in water!",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg"
    },
    {
        name: "Uranus",
        type: "Ice Giant",
        distance: "2.9 billion km",
        diameter: "50,724 km",
        fact: "Uranus rotates on its side! It has the coldest atmosphere of any planet in the solar system.",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg"
    },
    {
        name: "Neptune",
        type: "Ice Giant",
        distance: "4.5 billion km",
        diameter: "49,244 km",
        fact: "Neptune is the farthest planet from the Sun and has the strongest winds in the solar system.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg"
    },
    {
        name: "Pluto",
        type: "Dwarf Planet",
        distance: "5.9 billion km",
        diameter: "2,376 km",
        fact: "Pluto was reclassified as a dwarf planet in 2006. It has a heart-shaped glacier on its surface!",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg"
    }
];

function showPlanet(index) {
    var planet = planets[index];
    var contentArea = document.querySelector("#planetContent");

    contentArea.innerHTML = `
        <h2 style="margin-top: 0; color: #8a2be2; text-align: center;">${planet.name}</h2>
        <img src="${planet.image}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 12px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
        
        <div style="background: #f4f4f4; padding: 10px; border-radius: 8px; font-size: 14px; margin-bottom: 10px;">
            <p style="margin: 4px 0;"><strong>Type:</strong> ${planet.type}</p>
            <p style="margin: 4px 0;"><strong>Distance:</strong> ${planet.distance}</p>
            <p style="margin: 4px 0;"><strong>Diameter:</strong> ${planet.diameter}</p>
        </div>
        
        <p style="font-size: 14px; line-height: 1.4;"><strong>Fun Fact:</strong><br>${planet.fact}</p>
    `;
}

function buildPlanetSidebar() {
    var sidebar = document.querySelector("#planetSidebar");

    for (let i = 0; i < planets.length; i++) {
        var btn = document.createElement("div");
        btn.style.padding = "10px";
        btn.style.marginBottom = "5px";
        btn.style.borderRadius = "10px";
        btn.style.cursor = "pointer";
        btn.style.backgroundColor = "#e0e0e0";
        btn.style.transition = "0.2s";
        btn.innerHTML = `<p style= "margin: 0; font-weight: bold;">${planets[i].name}</p>`;

        btn.onmouseover = () => btn.style.backgroundColor = "#c0c0c0";
        btn.onmouseout = () => btn.style.backgroundColor = "#e0e0e0";

        btn.addEventListener("click", function () {
            showPlanet(i);
        });

        sidebar.appendChild(btn);
    }
}

buildPlanetSidebar();
showPlanet(0);