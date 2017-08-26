//Constructor function for Keyboard
function Keyboard(parentId, contentId){
      this.parent = parentId;
      this.content = contentId;
      this.shift = false;
      this.ctrl = false;
      this.backspace = false;
      this.sampleText = [84, 79, 78, 78, 75, 74];
      this.americanGrid = [
        [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 8],
        [81, 87, 69, 82, 84, 89, 85, 73, 79, 80],
        [65, 83, 68, 70, 71, 72, 74, 75, 76],
        [16, 90, 88, 67, 86, 66, 78, 77, 16],
        [32]
      ];
      this.specialKeys = [8, 16, 32];
      this.keys = [
        new Key(49, "1", "!", this.output),

        new Key(50, "2", "@", this.output),

        new Key(51, "3", "#", this.output),

        new Key(52, "4", "$", this.output),

        new Key(53, "5", "%", this.output),

        new Key(54, "6", "^", this.output),

        new Key(55, "7", "&", this.output),

        new Key(56, "8", "*", this.output),

        new Key(57, "9", "(", this.output),

        new Key(48, "0", ")", this.output),

        new Key(8, "BACKSPACE", "BACKSPACE", this.output),

        new Key(16, "SHIFT", "SHIFT", this.output),

        // new Key(17, "CTRL", "CTRL", this.output),

        new Key(32, "SPACE", "SPACE", this.output),
        //nasal u
        new Key(86, "&#x173", "&#x172;", this.output),

        //'LATIN SMALL LETTER OPEN E' (U+025B)
        new Key(90, "&#x25b;", "&#x190;", this.output),

        //'LATIN SMALL LETTER E WITH OGONEK' (U+0119)
        new Key(74, "&#x119;", "&#x118;"),

        //'LATIN CAPITAL LETTER GLOTTAL STOP' (U+0241)
        // new Key(81, "&#x241;")

        //'LATIN LETTER GLOTTAL STOP (U+0294)'
        new Key(81, "&#x241;", "&#x241;", this.output),

        //'LATIN SMALL LETTER C WITH CARON' (U+010D)
        new Key(67, "&#x10d;", "&#x10c;"),

        //'LATIN SMALL LETTER I WITH OGONEK' (U+012F)
        new Key(76, "&#x12f;", "&#x12e;"),

        //Small H
        new Key(88, "&#x2b0;", "&#x2b0;"),

        //'LATIN SMALL LETTER A WITH OGONEK' (U+0105)
        new Key(70, "&#x105;", "&#x104;"),

        //'GREEK SMALL LETTER ALPHA' (U+03B1)
        new Key(79, "&#x3b1;", "&#x391;"),

        //These are all the letters Catawba has in common with American English

        //a
        new Key(65, "&#x61;", "A", "&#225;"),
        //b
        new Key(66,"&#x62;", "B"),
        //d
        new Key(68, "&#x64;", "D"),
        //e
        new Key(69, "&#x65;", "E", "&#233;"),
        //g
        new Key(71, "&#x67;", "G"),
        //h
        new Key(72, "&#x68;", "H"),
        //i
        new Key(73, "&#x69;", "I", "&#237;"),
        //k
        new Key(75, "&#x6b;", "K"),
        //m
        new Key(77, "&#x6d;", "M"),
        //n
        new Key(78, "&#x6e;", "N"),
        //p
        new Key(80, "&#x70;", "P"),
        //r
        new Key(82, "&#x72;", "R"),
        //s
        new Key(83, "&#x73;", "S"),
        //t
        new Key(84, "&#x74;", "T"),
        //u
        new Key(85, "&#x75;", "U", "&#250;"),
        //w
        new Key(87, "&#x77;", "W"),
        //y
        new Key(89, "&#x79;", "Y"),
      ]
}

//The entire keyboard centers around Key objects which have name : value pairs for keyCode, UTF-8 hex code, shift, ctrl
//This is what the Keyboard uses to build its keys array
//ctrl has not been implemented yet
function Key(input, output, shift, ctrl){
  this.input = input;
  this.output = output;
  this.shift = shift;
  this.ctrl = ctrl;
}

//A way to return either the output, shift, or ctrl value based on the keyCode
Keyboard.prototype.type = function(keyCode){
    var output = "";
    for(var i = 0; i < this.keys.length; i++){
        if(keyCode == this.keys[i].input){
            //if ctrl is pushed and this object's ctrl isn't undefined then...
            if(this.ctrl && this.keys[i].ctrl != undefined){
              //  output = this.keys[i].ctrl;
              //  break
            }
            //if shift is pushed down and its shift value isn't undefined
            else if(this.shift && this.keys[i].shift != undefined){
                  output = this.keys[i].shift;
                  break
            }

            //if shift and ctrl are both false
            if(!this.shift && !this.ctrl){
                 output = this.keys[i].output;
                  break
            }
            //otherwise return a blank string
            else {
                  output = "";
                  break
            }
        }

    }
    return output;
}

//Compiles an html string using divId, divClass, and divContent
Keyboard.prototype.createKeyButton = function(divId, divClass, divContent){
    var div = "<div id=" + divId + " class=" + divClass + ">" + divContent + "</div>";
    return div
}

//Compiles and returns an html string of the entire board
//It does this by ordering inner key button divs based on a given 2 dimensional array
//Most of the time the 2D array will be this.americanGrid
Keyboard.prototype.createBoard = function(array2d){
    //a variable to store the html string
      var board = "";

    //a loop to run through each of the arrays in array2d
      for(var i = 0; i < array2d.length; i++){
          //first create the rowId based on the position in the array. rowClass's default value is keyRow
          //wrap rowId and rowClass in an opening div tag
            var rowId ="r" + i;
            var rowClass = "keyRow";
            var row = "<div class=" + rowClass + " id=" + rowId + ">";
          //Now we'll compile each key based on the values in the array at array2d[i]
            for(var j = 0; j < array2d[i].length; j++){
                //Create keyId based on the value in this position
                //Dynamically create keyClass based on keyCode
                  var keyId = "k" + array2d[i][j];
                  var keyClass = this.createKeyClass(array2d[i][j]);
                  var content = this.type(array2d[i][j]);

                //Add the key button to the row
                  row += this.createKeyButton(keyId, keyClass, content)
            }
            row += "</div>"
            board += row;
      }

      return board;
}

//Should take a given keyCode and dynamically return a white spaced string of class names
Keyboard.prototype.createKeyClass = function(keyCode){
    var keyCode = keyCode;
    var keyClass = "keyButton ";
    for(var i = 0; i < this.specialKeys.length; i++){
        if(keyCode == this.specialKeys[i]){
            var specialClass = this.type(keyCode)
            keyClass += specialClass.toLowerCase();
            break
        }
   }
   return keyClass
}

//A function that shows the board
Keyboard.prototype.show = function(){
    $(this.parent).html(this.createBoard(this.americanGrid));
}

Keyboard.prototype.mouseClicked = function(target){
    var target = target;
    var keyCode = $(target).attr("id").slice(1);
    this.update(keyCode);
}

Keyboard.prototype.clicked = function(keyCode){
    console.log(keyCode);
    this.update(keyCode);
}

Keyboard.prototype.unclicked = function(keyCode){
    if(keyCode == 16){
        this.shift = !this.shift;
        this.show();
    }
    //  else if(keyCode == 17){
    //     this.ctrl = !this.ctrl
    //     this.show();
    // }
}
//A function that updates the content element
Keyboard.prototype.update = function(keyCode){
    var keyCode = keyCode;
    var content = $(this.content).html();

    if(keyCode == 8){
        content = content.slice(0, -1);
    }
    else if(keyCode == 16){
        this.shift = !this.shift;
    }
    else if(keyCode == 17){
        this.ctrl = !this.ctrl
        return keyCode
    }
    else if(keyCode == 32){
        content += " ";
    }
    else if(!this.ctrl){
        content += this.type(keyCode);
    }
    this.show();
    $(this.content).html(content);
    return keyCode
}
