/**
 * CopyRight Samphay.
 * 2018/4/17
 */
require("../util/index");
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
function create(projectName="new_FFalcon_cms") {
    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: "please input your project name",
            default: function () {
                return projectName;
            }
        },
        {
            type: 'input',
            name: 'title',
            message: "please input your project title",
            default: function () {
                return projectName;
            }
        }
    ];
    /**
     * TODO:need to validate input value
     */
    inquirer.prompt(questions).then(({projectName,title}) => {
        let templatePath = path.resolve(__dirname,"../template/project");
        let workPath = path.resolve("./"+projectName);
        /**
         * copy templates to working path
         */
        fs.exists(workPath,(exit)=>{
            if(!exit){
                exec(`cp -r ${templatePath} ${workPath}`,(error, stdout, stderr) => {
                    if (error) {
                        console.log(error);
                        process.exit()
                    }
                    let configText = fs.readFileSync(path.resolve(workPath,"./src/utils/config.js"),"utf-8");
                    configText = configText.reDLBrace({title});
                    fs.writeFileSync(path.resolve(workPath,"./src/utils/config.js"),configText);
                    console.log(chalk.green(`\n √ Project [${projectName}] is created!`));
                    // console.log(chalk.green('\n '));
                    console.log(chalk.green(`\n project path is : ${workPath}`));
                    console.log(chalk.green(`\n 😁 Please enjoy your work!`));
                    process.exit(0)
                })
            }else{
                console.log(chalk.red(`\n × ${workPath} is existed!`));
                process.exit(0)
            }
        });

    });
}

module.exports={
    create
};