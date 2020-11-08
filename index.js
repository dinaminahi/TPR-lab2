let fileURL = 'file.json';
let wrapper = document.getElementById('tables');
createTables();

async function getFile() {
    const res = await fetch(fileURL);
    const t = await res.json();
    return t;
}

async function createTables() {
    let data = await getFile();
    data.forEach(option => {
        let table = document.createElement('table');
        for(let key in option) {
            if(key !== 'buildingProbability' && key !== 'notBuildingProbability') {
                fillTable(table, key, option[key]);
            }
        }
        let value = calcFormula(option.income, option.incomeProbability,
                                option.loss, option.lossProbability,
                                option.years, option.worth);
        option.value = value;
        fillTable(table, 'Value', value);
        wrapper.appendChild(table);
    });
    findBest(data);
}

function calcFormula(annualIncome, incomeProbability, loss, lossProbability, years, factoryCost) {
    return (annualIncome * incomeProbability + loss * lossProbability) * years / factoryCost
}

function findBest(options) {
    let maxValueOption = options.reduce((max, option) => max.value > option.value ? max : option);
    document.getElementById('best').innerText = `The best solution is ${maxValueOption.option}`;
}

function fillTable(table, prop, val ) {
    let row = document.createElement('tr');
    let col1 = document.createElement('td');
    let col2 = document.createElement('td');
    col1.innerText = prop;
    col2.innerText = val;
    row.appendChild(col1);
    row.appendChild(col2)
    table.appendChild(row);
}