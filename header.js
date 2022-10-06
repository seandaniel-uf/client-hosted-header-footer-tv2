// Function to handle the client navigation bar
const handleClientNav = () => {
  function createElem(elemType, elemOptions, elemText) {
    const newElement = document.createElement(elemType);
    if (elemOptions !== undefined) {
      Object.keys(elemOptions).forEach((attr) => {
        newElement.setAttribute(attr, elemOptions[attr]);
      });
    }
    if (elemText !== undefined) {
      newElement.innerText = elemText;
    }
    return newElement;
  }
  // - Get a list of all top menu nav items
  const topMenuItems = document.querySelectorAll(".ob-header-nav-list-item");

  // - Get a list of all mobile menu nav items
  const mobileMenuItems = document.querySelectorAll(".ob-mobile-has-submenu");

  // - Get a list of all megamenu panels
  const allPanels = document.querySelectorAll(
    ".ob-header-nav-desktop-container"
  );

  if (!topMenuItems && !mobileMenuItems && !allPanels) {
    return;
  }

  // - Function to add click events to the top menu nav items
  const addClickEvents = () => {
    // -- Iterate through each desktop menu item
    topMenuItems.forEach((menuItem) => {
      // --- Add a click event lister
      menuItem.addEventListener("click", (e) => {
        // ---- Prevent the default action
        e.preventDefault();

        // ---- Get the event
        const event = window.event || e;

        // ---- Get the parentNode of the event target element
        let parent = event.target.parentNode;

        // ---- Find the nearest <li> that's the parent of the event target element
        while (parent.tagName !== "LI") {
          parent = parent.parentNode;
        }

        const foundParent = parent;

        // ---- Grab the panel name out of the standardized naming convention, and then match it
        const panelToOpen = foundParent.id.substring(14);

        // ---- Check to see if the <li> is already active
        if (foundParent.classList.contains("is-active")) {
          // » Toggle the "is-active" class
          foundParent.classList.toggle("is-active");

          // » Toggle the "is-open" class on the respective panel element
          document
            .querySelector(`#ob-${panelToOpen}-panel`)
            .classList.toggle("is-open");
        } else {
          // » Iterate through each panel
          allPanels.forEach((panel) => {
            // »» If it's open, close it
            if (panel.classList.contains("is-open")) {
              panel.classList.remove("is-open");
            }
          });

          // » Iterate through the top menu items, declared previously
          topMenuItems.forEach((item) => {
            // »» If it's active, deactivate it
            if (item.classList.contains("is-active")) {
              item.classList.remove("is-active");
            }
          });

          // ---- Open the selected panel
          document
            .querySelector(`#ob-${panelToOpen}-panel`)
            .classList.toggle("is-open");

          // ---- Toggle the "is-active" class on the parent <li>
          foundParent.classList.toggle("is-active");
        }
      });
    });

    const getSiblings = function (elem) {
      // Setup siblings array and get the first sibling
      const siblings = [];
      let sibling = elem.parentNode.firstChild;

      // Loop through each sibling and push to the array
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
          siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
      }

      return siblings;
    };
    // -- Iterate through each mobile menu item
    mobileMenuItems.forEach((menuItem) => {
      // --- Add a click event listener
      menuItem.addEventListener("click", (e) => {
        // ---- Get the event
        const event = window.event || e;

        // ---- Get the event target
        const eventTarget = event.target;

        if (
          !eventTarget.parentNode.parentNode.classList.contains("ob-tier-3") &&
          eventTarget.parentNode.parentNode.classList.contains(
            "ob-mobile-has-submenu"
          )
        ) {
          // ---- Prevent the default action
          e.preventDefault();
          // ---- Stop event propagation
          e.stopPropagation();
          if (
            eventTarget.parentNode.parentNode.classList.contains(
              "ob-mobile-header-nav-list-item"
            )
          ) {
            const otherMenus = getSiblings(eventTarget.parentNode.parentNode);
            otherMenus.forEach((menu) => {
              menu.classList.remove("is-open");
            });
            eventTarget.parentNode.parentNode.classList.toggle("is-open");
          }
          if (
            eventTarget.parentNode.parentNode.classList.contains(
              "ob-mobile-header-nav-list-submenu-item"
            )
          ) {
            const otherMenus = getSiblings(eventTarget.parentNode.parentNode);
            otherMenus.forEach((menu) => {
              menu.classList.remove("is-open");
            });
            eventTarget.parentNode.parentNode.classList.toggle("is-open");
          }
        }
      });
    });
    // -- Handle the mobile menu hamburger
    const burgerElement = document.querySelector(".ob-burger");
    burgerElement.addEventListener("click", (e) => {
      // --- Prevent the default action
      e.preventDefault();

      burgerElement.classList.toggle("is-active");
      document
        .querySelector(".ob-mobile-header-nav-container")
        .classList.toggle("is-open");
    });
  };

  // - Function to build out the custom content for a panel
  const createCustomContent = (panelId, data) => {
    // -- Function to create a content link
    const createLink = (data) => {
      // --- Create the link element
      const link = createElem("a", {
        href: data.linkUrl,
        target: "_blank",
      });

      // --- Create a variable for the link text
      let linkText;

      // --- Check the link type from the config data
      if (data.linkType === "button") {
        // ---- Create the span element with the link text
        linkText = createElem("span", {}, data.linkText);

        // ---- Append the span to the link element
        link.appendChild(linkText);

        // ---- Add the appropriate classes
        link.classList.add("ob-header-nav-mm-button", "ob-download");
      } else if (data.linkType === "text") {
        // ---- Create a text node using the link text from the config data
        linkText = document.createTextNode(data.linkText);

        // ---- Append the text node to the link text content
        link.appendChild(linkText);

        // ---- Add the appropriate classes
        link.classList.add("ob-header-nav-mm-text-link");
      }

      // -- Return the completed link
      return link;
    };

    // -- Get the custom content div for the panel
    // prettier-ignore
    const panelContentDiv = document.querySelector(`#ob-${panelId}-panel > .ob-custom-content-column`);

    // -- Create a div for the asset image
    const imageDiv = createElem("div", {
      class: "ob-custom-content-image-container",
    });

    // --- Create a div for the asset link
    const linkDiv = createElem("div", {
      class: "ob-custom-content-asset-link-container",
    });

    // -- Check to see what type of content it is
    if (data.type === "asset") {
      // --- Create the img element
      const contentImg = createElem("img", {
        src: data.imageUrl,
        class: "ob-custom-content-image ob-asset-image",
        alt: data.imageAltText,
      });

      // --- Append the image to the image div, image div to content div
      imageDiv.appendChild(contentImg);
      panelContentDiv.appendChild(imageDiv);
    } else if (data.type === "feature") {
      // --- Create the img element
      const contentImg = createElem("img", {
        src: data.imageUrl,
        class: "ob-custom-content-image ob-feature-image",
        alt: data.imageAltText,
      });

      // --- Append the image to the image div, image div to content div
      imageDiv.appendChild(contentImg);
      panelContentDiv.appendChild(imageDiv);

      // --- Create the text div element
      const contentTextContainer = createElem("div", {
        class: "ob-custom-content-text ob-feature-text",
      });

      // --- Create the content heading element
      // prettier-ignore
      const contentHeader = createElem('h3', {
                class: 'ob-custom-content-feature-heading',
            }, data.contentHeadline);

      // --- Append the headline element to the text container
      contentTextContainer.appendChild(contentHeader);

      // --- Create the content body text element
      // prettier-ignore
      const contentBodyText = createElem('p', {
                class: 'ob-custom-content-feature-text',
            }, data.contentText);

      // --- Append the content body text to the text container
      contentTextContainer.appendChild(contentBodyText);

      // --- Append the text container to the content div
      panelContentDiv.appendChild(contentTextContainer);
    }

    // --- Create the link
    const newLink = createLink(data);

    // --- Append the link to the div
    linkDiv.appendChild(newLink);

    // --- Append the link div to the content div
    panelContentDiv.appendChild(linkDiv);
  };

  // - Function to handle custom content in the megamenu panels
  const handleCustomNavContent = () => {
    // -- Get the nav content configuration
    if (window.obData && window.obData.navContentConfig) {
      const navContentConfig = window.obData.navContentConfig;

      // --- Iterate through the panels
      allPanels.forEach((panel) => {
        // ---- Get the panel identifier
        let panelId = panel.id.match(/-(.*)-/);

        // ---- Get the length of the resulting array to get the matched value
        const lastMatch = panelId.length;
        panelId = panelId[lastMatch - 1];

        // ---- Find the content data
        for (const prop in navContentConfig) {
          if (prop === panelId) {
            const contentData = navContentConfig[prop];
            createCustomContent(panelId, contentData);
          }
        }
      });
    }
  };

  // - Getting the ball rolling
  addClickEvents();
  handleCustomNavContent();
};

handleClientNav();
