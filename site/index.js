/* Adapted by halloleo (http://halloleo.net)
   from CodeNerve (https://github.com/CodeNerve/CodeNerve.github.io) */

var Typer = {
  text: '',
  accessCountimer: null,
  index: 0,
  speed: 2,
  file: '',
  accessCount: 0,
  deniedCount: 0,
  
  init: function (content_file) {
    accessCountimer = setInterval(function () {
      Typer.updLstChr();
    }, 500);
    $.get(content_file, function (data) {
      Typer.text = data;
      Typer.text = Typer.text.slice(0, Typer.text.length - 1);
    });
  },

  content: function () {
    return $('#console').html();
  },

  write: function (str) {
    $('#console').append(str);
    return false;
  },

  addText: function (key) {
    if (key.keyCode == 18) {
      Typer.accessCount++;

      if (Typer.accessCount >= 3) {
        Typer.makeAccess();
      }
    } else if (key.keyCode == 20) {
      Typer.deniedCount++;

      if (Typer.deniedCount >= 3) {
        Typer.makeDenied();
      }
    } else if (key.keyCode == 27) {
      Typer.hidepop();
    } else if (Typer.text) {
      var cont = Typer.content();
      if (cont.substring(cont.length - 1, cont.length) == '|')
        $('#console').html(
          $('#console')
            .html()
            .substring(0, cont.length - 1),
        );
      if (key.keyCode != 8) {
        Typer.index += Typer.speed;
      } else {
        if (Typer.index > 0) Typer.index -= Typer.speed;
      }
      var text = Typer.text.substring(0, Typer.index);
      var rtn = new RegExp('\n', 'g');

      $('#console').html(text.replace(rtn, '<br/>'));
      window.scrollBy(0, 50);
    }

    if (key.preventDefault && key.keyCode != 122) {
      key.preventDefault();
    }

    if (key.keyCode != 122) {
      // otherway prevent keys default behavior
      key.returnValue = false;
    }
  },

  updLstChr: function () {
    var cont = this.content();

    if (cont.substring(cont.length - 1, cont.length) == '|')
      $('#console').html(
        $('#console')
          .html()
          .substring(0, cont.length - 1),
      );
    else this.write('|'); // else write it
  },
};

function replaceUrls(text) {
  var http = text.indexOf('http://');
  var space = text.indexOf('.me ', http);

  if (space != -1) {
    var url = text.slice(http, space - 1);
    return text.replace(url, '<a href="' + url + '">' + url + '</a>');
  } else {
    return text;
  }
}

var small_width_match = "(max-width: 600px)"
var medium_width_match = "(max-width: 1000px)"

function matchFunc(matchmedium) {
  var condiv = document.getElementById('console')
  if (matchmedium.matches) {
    if (window.matchMedia(small_width_match).matches) {
      Typer.init('tilde_small.txt');
      condiv.style.fontSize = "16px";
      condiv.style.width = "400px";
      //document.body.style.background = "darkblue";
    } else {
      Typer.init('tilde_medium.txt');
      condiv.style.fontSize = "15px";
      condiv.style.width = "550px";
      //document.body.style.background = "darkgrey";
    }
  } else {
    Typer.init('tilde_large.txt');
  }
}

var matchmedium = window.matchMedia(medium_width_match)
matchFunc(matchmedium) // Call listener function at run time
matchmedium.addListener(matchFunc) // Attach listener function on state changes


var timer = setInterval('t();', 30);
function t() {
  Typer.addText({ keyCode: 123748 });

  if (Typer.index > Typer.text.length) {
    clearInterval(timer);
  }
}
