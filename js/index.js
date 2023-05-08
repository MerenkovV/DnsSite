'use strict'

const Gallery = document.querySelector('.body__gallery');
const Item = document.querySelectorAll('.body__item');
let Place = 0;

Gallery.addEventListener('click', function(event){
    if(event.target.closest('.body__slider-right')){
        NextPlace();
        for (let index = 0; index < 7; index++) {
            Item[index].style.transform = `translateX(${Place}px)`;
        }
        
    }else if(event.target.closest('.body__slider-left')){
        PrevPlace();
         for (let index = 0; index < 7; index++) {
             Item[index].style.transform = `translateX(${Place}px)`;
        }
    }  
});

function NextPlace(){
    if(Place > -792){
        Place -= 198;
    }
}

function PrevPlace(){
    if(Place < 0){
        Place += 198;
    }
}