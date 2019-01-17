import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import $ from 'jquery';
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import { createTime } from "../helper/helper";
import firebase from "../firebase";
require("firebase/auth");
require("firebase/database");


@inject(firebase, Router)
export class Demo { 
  constructor(firebase, Router) {
    this.firebase = firebase;
    this.router = Router;
  }

  attached(){
     this.htmlEditor = codemirror.fromTextArea(htmlCodeContent, {
      lineNumbers: true,
      matchBrackets: true,
      mode: "xml",
      theme: "mdn-like"
    });

    this.cssEditor = codemirror.fromTextArea(cssContent, {
      lineNumbers: true,
      matchBrackets: true,
      mode: "css",
      theme: "mdn-like"
    });
    this.jsEditor = codemirror.fromTextArea(jsContent, {
      lineNumbers: true,
      matchBrackets: true,
      mode: "javascript",
      theme: "mdn-like"
    });
    this.postId = this.router.currentInstruction.queryParams.id;
    this.getPostContent(this.postId);
  }

  activate(params){
    this.postId = params.id;
    this.getPostContent(this.postId);

    $(function() {
      $(".nav-link").click(function() {
        $(this).toggleClass("selected");
        
        var id = $(this).attr("name");
        
        $("#" + id + "Container").toggle();
        
        var number = $(".codecontainer").filter(function() {
          
          return $(this).css("display") !== "none";
        }).length;
        var width = 100 / number;
        $(".codecontainer").css("width", width + "%");
        
      });
    });

    $("#run").click(function() {
      $("#resultFrame")
        .contents()
        .find("html")
        .html("<style>" + $("#css").val() + "</style>" + $("#html").val());
      document
        .getElementById("resultFrame")
        .contentWindow.eval($("#js").val());
    });
    
  }

  run(){
    const htmlCode = this.htmlEditor.getValue();
    const cssCode = this.cssEditor.getValue();
    const jsCode = this.jsEditor.getValue();
    $('#resultFrame').contents().find('html').find('body').html("<style>"+`${cssCode}`+"</style>"+`${htmlCode}`);
    document.getElementById('resultFrame').contentWindow.eval(`${jsCode}`);
  }

  getPostContent(id){
    const path = `posts/${id}`;
    this.error = '';
    const postRef = this.firebase.database().ref(path);
    postRef.on("value", (snapshot) => {
      this.post = snapshot.val();
      this.htmlEditor.getDoc().setValue(`${this.post.htmlCode}`);
      this.cssEditor.getDoc().setValue(`${this.post.cssCode}`);
      this.jsEditor.getDoc().setValue(`${this.post.jsCode}`);
    });
  }

}