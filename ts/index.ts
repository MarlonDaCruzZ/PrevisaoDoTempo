const form = document.querySelector("#form-time > form")
const input: HTMLInputElement | null = document.querySelector("#form-localizacao ")

const sectionInfos = document.querySelector("#time-info")

form?.addEventListener("submit", async (event)=>{
    event.preventDefault()

    if(!input || !sectionInfos) return;

    const localizacao = input.value
    if(localizacao.length < 3){
        alert("O local precisa ter mais de 3 caracteres");
        return;
    }


    //fazendo requisão HTTP
    try{

        const requisao = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=bfe34a6ebd5817b90c261fa8f57fdcf3&lang=pt_br&units=metric`);
        
        const dados = await requisao.json();
    
        const info = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icon: `https://openweathermap.com/img/wn/${dados.weather[0].icon}@2x.png`
        }
    
        sectionInfos.innerHTML = `
            <div class="condicoes">
             <h2>${info.local}</h2>
                    
             <span>${info.temperatura}°C </span>
            </div>
    
            <img src="${info.icon}"/>
        `
    } catch(err){
        console.log("deu erro ao obter os dados da API", err)
    }
})