const data = JSON.parse(localStorage.getItem('students')) || [];
const form = document.querySelector('#form');
const submitBtn = document.querySelector('#add');
const statusSelect = document.querySelector('#status');
const info = document.querySelector('.info');
const schoolList = document.querySelector('.school__list');
const instituteList = document.querySelector('.institute__list');
const table = document.querySelector('#studentstable');

class Student {
    constructor(fName, sName, age, sex) {
        this._fName = fName;
        this._sName = sName;
        this._age = age;
        this._sex = sex;
    }
    get fName() {
        return this._fName;
    }
    get sName() {
        return this._sName;
    }
    get age() {
        return this._age;
    }
    get sex() {
        return this.sex;
    }
    set fName(str) {
        this.fName = str;
    }
    set sName(str) {
        this.sName = str;
    }
    set age(num) {
        this.age = num;
    }
    set sex(str) {
        this.sex = str;
    }

}
class SchoolStudent extends Student {
    constructor(fName, sName, age, sex, schoolNumber, classNum) {
        super(fName, sName, age, sex);
        this._schoolNumber = schoolNumber;
        this._classNum = classNum;
    }
    get schoolNumber() {
        return this._className;
    }
    get classNum() {
        return this._classNum;
    }
    get info() {
        return {
            fName: this._fName, sName: this._sName, age: this._age, sex: this._sex,
            additionally: `Учащий(-ая)ся школы №${this._schoolNumber}, ${this._classNum} класса.`
        };
    }
    set schoolNumber(str) {
        this.schoolNumber = str;
    }
    set classNum(str) {
        this.classNum = str;
    }

}
class InstituteStudent extends Student {
    constructor(fName, sName, age, sex, instituteName, faculty, year) {
        super(fName, sName, age, sex);
        this._instituteName = instituteName;
        this._faculty = faculty;
        this._year = year;
    }
    get instituteName() {
        return this._instituteName;
    }
    get faculty() {
        return this._faculty;
    }
    get year() {
        return this._year;
    }
    get info() {
        return {
            fName: this._fName, sName: this._sName, age: this._age, sex: this._sex,
            additionally: `Студент(-ка) ${this._instituteName}, ${this._faculty} факультета, ${this._year} курса.`
        };
    }
    set instituteName(str) {
        this.instituteName = str;
    }
    set faculty(str) {
        this.faculty = str;
    }
    set year(num) {
        this.year = num;
    }
}
const render = () => {
    table.innerHTML = '';
    data.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.insertAdjacentHTML('beforeend', `
        <td>${item.sName}</td>
        <td>${item.fName}</td>
        <td>${item.age}</td>
        <td>${item.sex}</td>
        <td>${item.additionally}</td>
        <td><button class="btn btn-danger  remove">удалить</button></td>
        `);
        tr.querySelector('.remove').addEventListener('click', () => {
            data.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(data));
            render();
        });
        table.append(tr);

    });
};
const resetForm = () => {
    const allInputs = document.querySelectorAll('input');
    const allSelects = document.querySelectorAll('select');
    allInputs.forEach(input => {
        input.value = '';
    });
    allSelects.forEach(select => {
        select.selectedIndex = 0;
    });
    info.innerHTML = '';
};

statusSelect.addEventListener('change', (event) => {
    if (event.target.value === 'school') {
        info.innerHTML = '';
        info.insertAdjacentHTML("beforeend", `
            <div class="col-md-3">
                <label for="schoolNumber" class="form-label">Школа</label>
                <input type="text" class="form-control" id="schoolNumber" value="" required>
            </div>
            <div class="col-md-1">
                <label for="classNum" class="form-label">Класс</label>
                <input type="number" class="form-control" id="classNum" min="1" max="11" required>
            </div>`);
    } else {
        info.innerHTML = '';
        info.insertAdjacentHTML('beforeend', `            
            <div class="col-md-3">
                <label for="instituteName" class="form-label">Название института</label>
                <input type="text" class="form-control" id="instituteName" value="" required>
            </div>
            <div class="col-md-3">
                <label for="faculty" class="form-label">Факультет</label>
                <input type="text" class="form-control" id="faculty" value="" required>
            </div>
            <div class="col-md-1">
                <label for="year" class="form-label">Курс</label>
                <input type="number" class="form-control" id="year" min="1" max="5" required>
            </div>`);
    }
});
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const fName = document.querySelector('#fName').value;
    const sName = document.querySelector('#sName').value;
    const age = document.querySelector('#age').value;
    const sex = document.querySelector('#sex').value;
    if (statusSelect.value === 'school') {
        const schoolNumber = document.querySelector('#schoolNumber').value;
        const classNum = document.querySelector('#classNum').value;
        const newSchoolStudent = new SchoolStudent(fName, sName, age, sex, schoolNumber, classNum);
        data.push(newSchoolStudent.info);
        localStorage.setItem('students', JSON.stringify(data));
    } else {
        const instituteName = document.querySelector('#instituteName').value;
        const faculty = document.querySelector('#faculty').value;
        const year = document.querySelector('#year').value;
        const newInstituteStudent = new InstituteStudent(fName, sName, age, sex, instituteName, faculty, year);
        data.push(newInstituteStudent.info);
        localStorage.setItem('students', JSON.stringify(data));
    }
    render();
    resetForm();
});

render();
