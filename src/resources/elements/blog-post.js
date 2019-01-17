import {bindable} from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import Prism from "prismjs";
require("clipboard/dist/clipboard.js");
require("prismjs/plugins/toolbar/prism-toolbar.js");
require("prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js");

require("prismjs/themes/prism.css");


export class BlogPost {
  @bindable post;
  valueChanged(newValue, oldValue) {
  }

  attached(){
    Prism.highlightAll();
  }
}

