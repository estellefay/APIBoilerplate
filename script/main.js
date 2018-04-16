//All the JS and JQuery code will de written inside this anonymous function
$(document).ready(function () {

    //This function launch our application, and is tasked with the initialisation of every aspect of it
    function init(showAtStartup) {
        navigateView(showAtStartup);
        $('[data-target]').on('click', function () {
            navigateView(this.dataset.target);
        });
        $('[data-ajax]').on('click', function () {
            $.get("https://dog.ceo/api/breeds/list/all", function (data) {
                // ON crée un tableau avec la list des races
                let breedsList = Object.keys(data.message);
                // On crée une balise Ul
                let list = document.createElement('ul');
                list.classList.add('list-style');
                //On parcours chacune des races
                for (var i = 0; i < breedsList.length; i++) {
                    // ON crée un élément li, puis on lui rajoute le nom de la race puis on le rajoute en ul
                    let listElement = document.createElement('li');
                    listElement.innerHTML = breedsList[i];
                    list.appendChild(listElement);
                };
                // ON ajoute le ul à notre section
                document.querySelector('[data-page="home"]').appendChild(list);
                
                $('li').on('click', function () {
                    $.get("https://dog.ceo/api/breed/" + this.innerHTML + "/images/random", function (imgs) {

                        console.log($('.modal').length);
                        if($('.modal').length > 0) { // Si la longeur la class modal est superieur à 1 ( sa veux dire que l'image est afficher ) alors ....
                        $( "div" ).remove( ".modal" ); // On supprime toutes les modal.
                        };


                        let imgDiv = document.createElement('div'); // Cette variable permet de crée une div 
                        imgDiv.classList.add('modal'); // On crée la class modal et on l'ajoute à la variable qui est devenue l'élément div
                        let img = document.createElement('img'); // on défini la cariable img qui crée l'élément image
                        img.src = imgs.message; // variable img( tag img ). src ( attribue du tag img ) = 
                        imgDiv.appendChild(img);
                        document.querySelector('body').appendChild(imgDiv);
                    
                });

                });

                


            
                // ON vas crée des events lisntenr pour le click de chacune des races
                // QUand on click sur un race on lance une nouvelle requette ajax
                // QUi recuperera une liste d'image pour la race cliquée 
                // url https://dog.ceo/api/breed/hound/images"
               } );
            });
        };



    //Allow to hide and show every section of our application
    function navigateView (sectionToShow) {
        let sections = $('[data-page]');
        let error = true;
        for (let i = 0; i < sections.length; i++) {
            if(sections[i].dataset.page == sectionToShow) {
                sections[i].classList.remove('hidden');
                error = false;
            } else {
                sections[i].classList.add('hidden');
            }
        }
        if(error) {
            throw ('Selector error, nothing found for ' + sectionToShow);
        }
    }

    init('home');
});