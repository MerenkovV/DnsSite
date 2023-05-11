'use strict'

const Gallery = document.querySelector('.body__gallery');
const Item = document.querySelectorAll('.body__item');
const Scroll1 = document.querySelector('.scroll__wrapper');
const NoDrag = document.querySelectorAll('img, a');
const StartPosS1 = Scroll1.getBoundingClientRect().left;

let IsClick = true;
let Place = 0;
let IsPressed = false;
let speed;
let ClientPos;
let NewPos = 0;
let DeltaPos;
let PrevMs = 0;




NoDrag.forEach(element => {
    element.addEventListener('dragstart', function(event){
        event.preventDefault();
    });
    element.addEventListener('click', function(e){
        if(!IsClick){
            e.preventDefault();
            e.stopPropagation();
            IsClick = true;
            }
    });
});

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

Scroll1.addEventListener('mousedown', function(e){
    if(e.target.closest('.scroll__item')){
        IsPressed = true;
        ClientPos = e.clientX;
        IsClick = true;
    }
});

Scroll1.addEventListener('mousemove', function(e){
    if(IsPressed){
        DeltaPos = e.clientX - ClientPos;
        console.log(DeltaPos);
        IsClick = false;
        
        if(Scroll1.getBoundingClientRect().left <= StartPosS1){
            Scroll1.style.transform = `translateX(${DeltaPos + NewPos}px)`;
        }else if(Scroll1.getBoundingClientRect().left > StartPosS1){

            if(DeltaPos < 0){
                Scroll1.style.transform = `translateX(${DeltaPos}px)`;
                NewPos = 0;
            }else{
                //Scroll1.style.transform = `translateX(${DeltaPos*0.6}px)`;
                NewPos = 0;
            }
        }
        
    }
});

document.addEventListener('mouseup', function(e){
    if(IsPressed){
        IsPressed = false;
        NewPos += DeltaPos;
    }
    
});

