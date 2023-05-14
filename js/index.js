'use strict'

const Gallery = document.querySelector('.body__gallery');
const Item = document.querySelectorAll('.body__item');
const Scroll1 = document.querySelectorAll('.scroll__wrapper');
const NoDrag = document.querySelectorAll('img, a');
const StartPosS1 = [Scroll1[0].getBoundingClientRect().left, Scroll1[1].getBoundingClientRect().left];
const Input = document.querySelector('.subscribe__input');
const PlaceHolder = Input.placeholder;

let IsClick = true;
let Place = 0;
let IsPressed = false;
let NumberOfScroll;
let ClientPos;
let NewPos = [0, 0];
let DeltaPos;
let PrevMs = 0;

Input.addEventListener("focus", function(event){
    Input.placeholder = "";
});
Input.addEventListener("blur", function(event){
        Input.placeholder = PlaceHolder;
});


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

document.addEventListener('mousedown', function(e){
    if(e.target.closest('.scroll__item')){
        IsPressed = true;
        ClientPos = e.clientX;
        IsClick = true;
    }
    if(e.target.closest('.stories__scroll')){
        NumberOfScroll = 1;
    }else if(e.target.closest('.body__bottom')){
        NumberOfScroll = 0;
    }
});

document.addEventListener('mousemove', function(e){
    if(IsPressed){
        DeltaPos = e.clientX - ClientPos;
        console.log(DeltaPos);
        IsClick = false;
        
        if(Scroll1[NumberOfScroll].getBoundingClientRect().left <= StartPosS1[NumberOfScroll]){
            Scroll1[NumberOfScroll].style.transform = `translateX(${DeltaPos + NewPos[NumberOfScroll]}px)`;
        }else if(Scroll1[NumberOfScroll].getBoundingClientRect().left > StartPosS1[NumberOfScroll]){

            if(DeltaPos < 0){
                Scroll1[NumberOfScroll].style.transform = `translateX(${DeltaPos}px)`;
                NewPos[NumberOfScroll] = 0;
            }else{
                NewPos[NumberOfScroll] = 0;
            }
        }
        
    }
});

document.addEventListener('mouseup', function(e){
    if(IsPressed){
        IsPressed = false;
        NewPos[NumberOfScroll] += DeltaPos;
    }
    
});

