<script>
// Create a variable for the API endpoint. In this example, we're accessing Xano's API
let xanoUrl = new URL('https://x8ki-letl-twmt.n7.xano.io/api:vK8uySk8/webflow_idea_submission_form');

// Define a function (set of operations) to get restaurant information.
// This will use the GET request on the URL endpoint
function getRestaurants() {

    // Create a request variable and assign a new XMLHttpRequest object to it.
    // XMLHttpRequest is the standard way you access an API in plain Javascript.
    let request = new XMLHttpRequest();

    // Define a function (set of operations) to get restaurant information.
    // Creates a variable that will take the URL from above and makes sure it displays as a string. 
    // We then add the word 'restaurant" so the API endpoint becomes https://x715-fe9c-6426.n7.xano.io/api:Iw1iInWB/restaurant
    let url = xanoUrl.toString();


    // Remember the 'request' was defined above as the standard way to access an API in Javascript.
    // GET is the verb we're using to GET data from Xano
    request.open('GET', url, true)

    // When the 'request' or API request loads, do the following...
    request.onload = function() {

        // Store what we get back from the Xano API as a variable called 'data' and converts it to a javascript object
        let data = JSON.parse(this.response)

        // Status 200 = Success. Status 400 = Problem.  This says if it's successful and no problems, then execute 
        if (request.status >= 200 && request.status < 400) {

            // Map a variable called cardContainer to the Webflow element called "Cards-Container"
            const cardContainer = document.getElementById("Cards-Container")

            // This is called a For Loop. This goes through each object being passed back from the Xano API and does something.
            // Specifically, it says "For every element in Data (response from API), call each individual item restaurant"
            data.forEach(restaurant => {

                // For each restaurant, create a div called card and style with the "Sample Card" class
                const style = document.getElementById('samplestyle')
                // Copy the card and it's style
                const card = style.cloneNode(true)

                card.setAttribute('id', '');
                card.style.display = 'block';
                
                
                //the following two sections event listener and image input is whats crashing the code
                // When a restuarant card is clicked, navigate to the item page by passing the restaurant id
                card.addEventListener('click', function() {
                    document.location.href = "/project?id=" + restaurant.id;
                });

                // For each restaurant, Create an image and use the restaurant image coming from the API
                const img = card.getElementsByTagName('IMG')[0]
                img.src = restaurant.YourImage.url + "?tpl=big:box"; // using Xano's template engine to re-size the pictures down and make them a box


                
                // For each restaurant, create an h3 and set the text content to the restaurant's title
                const h1 = card.getElementsByTagName('H1')[0]
                h1.textContent = restaurant.IdeaName;
                
              
   

                // For each restaurant, create an h2 and set the text content to the restaurant's title
                const h2 = card.getElementsByTagName('H2')[0]
                h2.textContent = restaurant.YourSummary;
                
                //test to get creators name on card
                const h4 = card.getElementsByTagName('H4')[0]
                h4.textContent = restaurant.YourName;
                
                //test to get time stamp on card
                const h5 = card.getElementsByTagName('h5')[0]
                h5.textContent = restaurant.created_at;
                
                //test to get selfrating on card using two of the same heading type
                //Const can be anything as long as the line below is the same.
                // the tagname i cannot get to work for custom tags on h5,h6 etc
                const h3 = card.getElementsByTagName('h3')[0]
                h3.textContent = restaurant.SelfRating;

                // For each restaurant, create an paragraph and set the text content to the restaurant's description
                //const p = card.getElementsByTagName('P')[0]
                //p.textContent = `${restaurant.YourIdea.substring(0, 240)}` // Limit to 240 chars

                // Place the card into the div "Cards-Container" 

                cardContainer.appendChild(card);
            })
        }
    }

    // Send Restaurant request to API
    request.send();
}



// This fires all of the defined functions when the document is "ready" or loaded
(function() {
    getRestaurants();
})();


</script>