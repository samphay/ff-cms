/**
 * CopyRight Samphay.
 * 2018/4/17
 */
require('../util/index');
const inquirer = require('inquirer');
const babel = require("babel-core");
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify').js_beautify;
const exec = require('child_process').exec;
const tpl = {
    model: path.resolve(__dirname, "../template/tpl/model.f-cms-tpl"),
    index: path.resolve(__dirname, "../template/tpl/index.route.f-cms-tpl"),
    add: path.resolve(__dirname, "../template/tpl/add.route.f-cms-tpl"),
    style: path.resolve(__dirname, "../template/tpl/style.f-cms-tpl"),
    routerConfig: path.resolve(__dirname, "../template/tpl/routerConfig.f-cms-tpl"),
};
const menuPath = [
    {
        dir: "./src/models/",
        tpls: [
            {
                name: "model",
                type: "js"
            }
        ]
    },
    {
        dir: "./src/routes/",
        tpls: [
            {
                name: "index",
                type: "js"
            },
            {
                name: "add",
                type: "js"
            },
            {
                name: "style",
                type: "less"
            }
        ]
    }
];
const routerFile = path.resolve("./src/router.js");
function mkdir(path,cb) {
    fs.mkdir(path, function (err) {
        if(err){
            return false
            // console.log(chalk.red("mkdir err:",err))
        }
        console.log(chalk.green(`\n ✔ dir [${path}] is created!`));
        cb&&cb();
    })
}
function createFiles(data, files,output) {
    files.map(({name,type})=>{
        const tplFile = tpl[name];
        let outputFile = path.resolve(output,data.namespace+"/"+name+"."+type);
        if(name==="model"){
            outputFile = path.resolve(output,data.namespace+"."+type);
        }else{
            fs.exists(path.resolve(output,data.namespace),(exit)=>{
                if(!exit){
                    mkdir(path.resolve(output,data.namespace))
                }
            });
        }
        let text = fs.readFileSync(tplFile, 'utf8');
        text = text.reDLBrace(data);
        fs.exists(outputFile,function (exit) {
            if(exit){
                console.log(chalk.red(`\n ✘ [${outputFile}] is exited!`))
            }else{
                fs.writeFile(outputFile, text,function (err) {
                    if(err){
                        console.log(err)
                    }
                    console.log(chalk.green(`\n ✔ [${outputFile}] is created!`))
                });
            }
        });
    })
}
function createRouter(data) {
    const tplFile = tpl.routerConfig;
    let text = fs.readFileSync(tplFile, 'utf8');
    text = text.reDLBrace(data);
    const {ast} = babel.transform(text, {
        babelrc: false,
        plugins: [
            "syntax-jsx"
        ]
    });
    // fs.writeFileSync("ast.json", JSON.stringify(ast, null, 2));
    addRouterConfig(ast.program.body[0].declarations[0].init.elements[0]);
    /*ast.program.body.map((items, n) => {
        const element = items.declarations[0].init.elements[0];
        addRouterConfig(element)
    });*/
}
function addMenu() {
    const questions = [
        {
            type: 'input',
            name: 'parentPath',
            message: "please input parentPath"
        },
        {
            type: 'input',
            name: 'parentName',
            message: "please input parentName"
        },
        {
            type: 'input',
            name: 'namespace',
            message: "please input menuPath"
        },
        {
            type: 'input',
            name: 'menuName',
            message: "please input menuName"
        }
    ];
    /**
     * TODO:need to validate input value
     */
    inquirer.prompt(questions).then((answers) => {
        answers.date = new Date().Format("yyyy-MM-dd hh:mm:ss");
        const {parentPath} = answers;
        menuPath.map(({dir,tpls}) => {
            // const dirPath = path.resolve(dir);
            const newPath = path.resolve(dir + parentPath);
            // console.log(dirPath,newPath)
            fs.exists(newPath, (exit) => {
                if (!exit) {
                    mkdir(newPath, function () {
                        createFiles(answers,tpls,newPath)
                    })
                } else {
                    createFiles(answers,tpls,newPath);
                }
            });
        });
        createRouter(answers)
    });
}

function addRouterConfig(element) {
    // let filePath = path.resolve(__dirname, "./router2.js");
    let text = fs.readFileSync(routerFile, 'utf8');
    const {ast} = babel.transform(text, {
        babelrc: false,
        plugins: [
            "syntax-jsx"
        ]
    });
    ast.program.body.map((items, n) => {
        if (items.declaration) {
            items.declaration.body.body.map((Variable, m) => {
                if (Variable.type === "VariableDeclaration") {
                    if (Variable.declarations[0].id.name === "configRoutes") {
                        found = true;
                        ast.program.body[n].
                            declaration.body.body[m].
                            declarations[0].init.elements.push(element)
                        // fs.writeFileSync("ast.json", JSON.stringify(Variable, null, 2));
                    }
                }
            })
        }
    });
// fs.writeFileSync("ast.json", JSON.stringify(ast,null,2));
    const {code} = babel.transformFromAst((ast));
    fs.writeFileSync(routerFile, beautify(code,{indent_size: 2,e4x:true}));
}

module.exports = {
    addMenu
};

