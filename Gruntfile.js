/*!
 * JEC Wildcat Gruntfile.js
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC projects: <https://github.com/pechemann/JEC>
 */

/*
 * Provides tasks for building and testing the jec-wildcat project.
 */
module.exports = function(grunt) {

  //--> Grunt config initialization:
  grunt.initConfig({});

  //--> Compiles all ".ts" whithin the "src" folder:
  grunt.config("ts", {
    build : {
      src: ["src/**/*.ts"],
      options: {
        module: "commonjs",
        target: "es6",
        sourceMap: false,
        declaration: true,
        declarationDir: "types/temp",
        removeComments: true,
        preserveConstEnums: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        alwaysStrict: true,
        fast: "never"
      }
    }
  });

  //--> Copies all ".js" files from the "src" to the "lib" folder:
  grunt.config("copy", {
    files: {
      cwd: "src",
      src: "**/*.js",
      dest: "lib",
      expand: true,
    }
  });
  
  //--> Build the API documentation:
  grunt.config("typedoc", {
    doc: {
      src: "src/",
      options: {
        module: "commonjs",
        target: "ES6",
        out: "docs/api-reference",
        readme: "README.md",
        name: "JEC Wildcat Project",
        exclude: "**/*Test*.ts"
      }
    }
  });

  //--> Imports the TypeScript compilation task:
  grunt.loadNpmTasks('grunt-ts');

  //--> Imports the task used for copying all ".js" files from the "src" to the 
  //    "lib" folder:
  grunt.loadNpmTasks("grunt-contrib-copy");

  //--> Imports the task used for building API documentation:
  grunt.loadNpmTasks('grunt-typedoc');

  /*!
   * JEC Wildcat Tasks:
   */

  //--> Task: builds the "jec-wildcat" project:
  grunt.registerTask("build", ["ts:build", "copy"]);

  //--> Task: builds the "jec-wildcat" API documentation:
  grunt.registerTask("doc", ["typedoc"]);
}