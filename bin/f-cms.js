#!/usr/bin/env node
/**
 * CopyRight Samphay.
 * 2018/4/17
 */
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
program.version(require('../package.json').version);
program.command("init")
    .alias('i')
    .description('init a new project')
    .option("--name,--projectName [ProjectName]", "named a project name")
    .action(function ({projectName}) {
        require('../script/create').create(projectName)
    });

program.command("addMenu")
    .alias('am')
    .description('add a menu')
    // .option("--name,--projectName [ProjectName]", "named a project name")
    .action(function (/*{projectName}*/) {
        require('../script/addMenu').addMenu()
    });

program.parse(process.argv);