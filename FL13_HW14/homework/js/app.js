function Student(name, email) {
    let homeworkResults = [];
    let _name = name;
    let _email = email;
    this.getHomeworkResults = () => homeworkResults;
    this.getName = () => _name;
    this.getEmail = () => _email;
    this.addHomeworkResult = function(topic, success) {
        homeworkResults.push({
            topic: `${topic}`,
            success: `${success}`
        });
    };
}


function FrontendLab(students, failedLimit) {
    let studentsList = students.map(e => {
        return new Student(e.name, e.email);
    });
    let failedHomeworksLimit = failedLimit;
    this.printStudentsList = function() {
        studentsList.forEach(element => {
            console.log(`name:${element.getName()}, email:${element.getEmail()} `);
            console.log(element.getHomeworkResults());
        });
    };
    this.addHomeworkResults = function(homeworkResults) {
        studentsList.forEach(element => {
            homeworkResults.results.forEach(e => {
                e.email === element.getEmail() ? element.addHomeworkResult(homeworkResults.topic, e.success) : 0;
            })
        });
    };
    this.printStudentsEligibleForTest = () => {
        studentsList.forEach(element => {
            let counter = 0;
            let results = element.getHomeworkResults();
            results.forEach(e => {
                e.success === 'false' ? counter++ : 0;
            });
            if (counter < failedHomeworksLimit) {
                console.log(`name:${element.getName()}, email:${element.getEmail()} `);
            }
        });
    };
}