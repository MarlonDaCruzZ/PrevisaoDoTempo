"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#form-time > form");
const input = document.querySelector("#form-localizacao ");
const sectionInfos = document.querySelector("#time-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionInfos)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter mais de 3 caracteres");
        return;
    }
    //fazendo requisão HTTP
    try {
        const requisao = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=bfe34a6ebd5817b90c261fa8f57fdcf3&lang=pt_br&units=metric`);
        const dados = yield requisao.json();
        const info = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icon: `https://openweathermap.com/img/wn/${dados.weather[0].icon}@2x.png`
        };
        sectionInfos.innerHTML = `
            <div class="condicoes">
             <h2>${info.local}</h2>
                    
             <span>${info.temperatura}°C </span>
            </div>
    
            <img src="${info.icon}"/>
        `;
    }
    catch (err) {
        console.log("deu erro ao obter os dados da API", err);
    }
}));
