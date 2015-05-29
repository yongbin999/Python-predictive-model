(function(jQuery){function DummyObject(){}
function create(proto){if(typeof proto!=='object'){return{};}
else if(Object.create){return Object.create(proto);}
DummyObject.prototype=proto;return new DummyObject();}
jQuery.inherit=function(parent,methods,properties){methods=methods||{};function Object(){parent.apply(this,arguments);}
var Child=methods.hasOwnProperty('constructor')?methods.constructor:Object;Child.prototype=create(parent.prototype);Child.prototype.constructor=Child;jQuery.extend(Child.prototype,methods);return jQuery.extend(Child,parent,properties,{__super__:parent.prototype});};})(this.jQuery);
(function(jQuery){jQuery.proxyAll=function(obj){var methods=[].slice.call(arguments,1);var index=0;var length=methods.length;var property;var method;for(;index<length;index+=1){method=methods[index];for(property in obj){if(typeof obj[property]==='function'){if((method instanceof RegExp&&method.test(property))||property===method){if(obj[property].proxied!==true){obj[property]=jQuery.proxy(obj[property],obj);obj[property].proxied=true;}}}}}
return obj;};})(this.jQuery);
(function($,window){$.url={escape:function(string){return window.encodeURIComponent(string||'').replace(/%20/g,'+');},slugify:function(string,trim){var str='';var index=0;var length=string.length;var map=this.map;for(;index<length;index+=1){str+=map[string.charCodeAt(index).toString(16)]||'-';}
str=str.toLowerCase();return trim===false?str:str.replace(/\-+/g,'-').replace(/^-|-$/g,'');}};var unicode=('20 30 31 32 33 34 35 36 37 38 39 41 42 43 44 45 46 '+'47 48 49 50 51 52 53 54 55 56 57 58 59 61 62 63 64 65 66 67 68 69 70 '+'71 72 73 74 75 76 77 78 79 100 101 102 103 104 105 106 107 108 109 '+'110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 '+'126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 '+'142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 '+'158 159 160 161 162 163 164 165 166 167 168 169 170 171 172 173 '+'174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 '+'190 191 192 193 194 195 196 197 198 199 200 201 202 203 204 205 '+'206 207 208 209 210 211 212 213 214 215 216 217 218 219 220 221 '+'222 223 224 225 226 227 228 229 230 231 232 233 234 235 236 237 '+'238 239 240 241 242 243 244 245 246 247 248 249 250 251 252 253 '+'254 255 256 257 258 259 260 261 262 263 264 265 266 267 268 269 '+'270 271 272 273 274 275 276 277 278 279 280 281 282 283 284 285 '+'286 287 288 289 290 291 292 293 294 295 296 297 298 299 363 364 '+'365 366 367 368 369 386 388 389 390 391 392 393 394 395 396 397 '+'398 399 400 401 402 403 404 405 406 407 408 409 410 411 412 413 '+'414 415 416 417 418 419 420 421 422 423 424 425 426 427 428 429 '+'430 431 432 433 434 435 436 437 438 439 440 441 442 443 444 445 '+'446 447 448 449 450 451 452 453 454 455 456 457 458 459 460 461 '+'462 463 464 465 466 467 468 469 470 471 472 473 474 475 476 477 '+'478 479 480 481 490 491 492 493 494 495 496 497 498 499 500 501 '+'502 503 504 505 506 507 508 509 510 511 512 513 514 515 531 532 '+'533 534 535 536 537 538 539 540 541 542 543 544 545 546 547 548 '+'549 550 551 552 553 554 555 556 561 562 563 564 565 566 567 568 '+'569 570 571 572 573 574 575 576 577 578 579 580 581 582 583 584 '+'585 586 587 4a 4b 4c 4d 4e 4f 5a 6a 6b 6c 6d 6e 6f 7a a2 a3 a5 a7 '+'a9 aa ae b2 b3 b5 b6 b9 c0 c1 c2 c3 c4 c5 c6 c7 c8 c9 ca cb cc cd '+'ce cf d0 d1 d2 d3 d4 d5 d6 d7 d8 d9 da db dc dd de df e0 e1 e2 e3 '+'e4 e5 e6 e7 e8 e9 ea eb ec ed ee ef f0 f1 f2 f3 f4 f5 f6 f8 f9 fa '+'fb fc fd ff 10a 10b 10c 10d 10e 10f 11a 11b 11c 11d 11e 11f 12a '+'12b 12c 12d 12e 12f 13a 13b 13c 13d 13e 13f 14a 14b 14c 14d 14e '+'14f 15a 15b 15c 15d 15e 15f 16a 16b 16c 16d 16e 16f 17a 17b 17c '+'17d 17e 17f 18a 18b 18c 18d 18e 18f 19a 19b 19c 19d 19e 19f 1a0 '+'1a1 1a2 1a3 1a4 1a5 1a6 1a7 1a8 1a9 1aa 1ab 1ac 1ad 1ae 1af 1b0 '+'1b1 1b2 1b3 1b4 1b5 1b6 1b7 1b8 1b9 1ba 1bb 1bc 1bd 1be 1bf 1c4 '+'1c5 1c6 1c7 1c8 1c9 1ca 1cb 1cc 1cd 1ce 1cf 1d0 1d1 1d2 1d3 1d4 '+'1d5 1d6 1d7 1d8 1d9 1da 1db 1dc 1dd 1de 1df 1e0 1e1 1e2 1e3 1e4 '+'1e5 1e6 1e7 1e8 1e9 1ea 1eb 1ec 1ed 1ee 1ef 1f0 1f1 1f2 1f3 1f4 '+'1f5 1f6 1f7 1f8 1f9 1fa 1fb 1fc 1fd 1fe 1ff 20a 20b 20c 20d 20e '+'20f 21a 21b 21c 21d 21e 21f 22a 22b 22c 22d 22e 22f 23a 23b 23c '+'23d 23e 23f 24a 24b 24c 24d 24e 24f 25a 25b 25c 25d 25e 25f 26a '+'26b 26c 26d 26e 26f 27a 27b 27c 27d 27e 27f 28a 28b 28c 28d 28e '+'28f 29a 29b 29c 29d 29e 29f 2a0 2a1 2a2 2a3 2a4 2a5 2a6 2a7 2a8 '+'2a9 2aa 2ab 2ac 2ae 2af 2b0 2b1 2b2 2b3 2b4 2b5 2b6 2b7 2b8 2df '+'2e0 2e1 2e2 2e3 2e4 36a 36b 36c 36d 36e 36f 37b 37c 37d 38a 38c '+'38e 38f 39a 39b 39c 39d 39e 39f 3a0 3a1 3a3 3a4 3a5 3a6 3a7 3a8 '+'3a9 3aa 3ab 3ac 3ad 3ae 3af 3b0 3b1 3b2 3b3 3b4 3b5 3b6 3b7 3b8 '+'3b9 3ba 3bb 3bc 3bd 3be 3bf 3c0 3c1 3c2 3c3 3c4 3c5 3c6 3c7 3c8 '+'3c9 3ca 3cb 3cc 3cd 3ce 3d0 3d1 3d2 3d3 3d4 3d5 3d6 3d7 3d8 3d9 '+'3da 3db 3dc 3dd 3de 3df 3e2 3e3 3e4 3e5 3e6 3e7 3e8 3e9 3ea 3eb '+'3ec 3ed 3ee 3ef 3f0 3f1 3f2 3f3 3f4 3f5 3f6 3f7 3f8 3f9 3fa 3fb '+'3fc 3fd 3fe 3ff 40a 40b 40c 40d 40e 40f 41a 41b 41c 41d 41e 41f '+'42a 42b 42c 42d 42e 42f 43a 43b 43c 43d 43e 43f 44a 44b 44c 44d '+'44e 44f 45a 45b 45c 45d 45e 45f 46a 46b 46c 46d 46e 46f 47a 47b '+'47c 47d 47e 47f 48a 48b 48c 48d 48e 48f 49a 49b 49c 49d 49e 49f '+'4a0 4a1 4a2 4a3 4a4 4a5 4a6 4a7 4a8 4a9 4aa 4ab 4ac 4ad 4ae 4af '+'4b0 4b1 4b2 4b3 4b4 4b5 4b6 4b7 4b8 4b9 4ba 4bb 4bc 4bd 4be 4bf '+'4c0 4c1 4c2 4c3 4c4 4c5 4c6 4c7 4c8 4c9 4ca 4cb 4cc 4cd 4ce 4cf '+'4d0 4d1 4d2 4d3 4d4 4d5 4d6 4d7 4d8 4d9 4da 4db 4dc 4dd 4de 4df '+'4e0 4e1 4e2 4e3 4e4 4e5 4e6 4e7 4e8 4e9 4ea 4eb 4ec 4ed 4ee 4ef '+'4f0 4f1 4f2 4f3 4f4 4f5 4f6 4f7 4f8 4f9 4fa 4fb 4fc 4fd 4fe 4ff '+'50a 50b 50c 50d 50e 50f 51a 51b 51c 51d 53a 53b 53c 53d 53e 53f '+'54a 54b 54c 54d 54e 54f 56a 56b 56c 56d 56e 56f 57a 57b 57c 57d '+'57e 57f').split(' ');var replacement=('- 0 1 2 3 4 5 6 7 8 9 A B C D E F G H I P Q R S T '+'U V W X Y a b c d e f g h i p q r s t u v w x y A a A a A a C c C c '+'D d E e E e E e E e G g G g H h H h I i I i IJ ij J j K k k L l L l '+'N n N n N n n O o OE oe R r R r R r S s T t T t T t U u U u U u W w '+'Y y Y Z b B b b b b C C c D E F f G Y h i I K k A a A a E e E e I i '+'R r R r U u U u S s n d 8 8 Z z A a E e O o Y y l n t j db qp < ? ? '+'B U A E e J j a a a b c e d d e e g g g Y x u h h i i w m n n N o oe '+'m o r R R S f f f f t t u Z Z 3 3 ? ? 5 C O B a e i o u c d A '+'E H i A B r A E Z H O I E E T r E S I I J jb A B B r D E X 3 N N P '+'C T y O X U h W W a 6 B r d e x 3 N N P C T Y qp x U h W W e e h r '+'e s i i j jb W w Tb tb IC ic A a IA ia Y y O o V v V v Oy oy C c R '+'r F f H h X x 3 3 d d d d R R R R JT JT E e JT jt JX JX U D Q N T '+'2 F r p z 2 n x U B j t n C R 8 R O P O S w f q n t q t n p h a n '+'a u j u 2 n 2 n g l uh p o S u J K L M N O Z j k l m n o z c f Y s '+'c a r 2 3 u p 1 A A A A A A AE C E E E E I I I I D N O O O O O X O '+'U U U U Y p b a a a a a a ae c e e e e i i i i o n o o o o o o u u '+'u u y y C c C c D d E e G g G g I i I i I i l L l L l L n n O o O '+'o S s S s S s U u U u U u z Z z Z z f D d d q E e l h w N n O O o '+'P P P p R S s E l t T t T U u U U Y y Z z 3 3 3 3 2 5 5 5 p DZ Dz '+'dz Lj Lj lj NJ Nj nj A a I i O o U u U u U u U u U u e A a A a AE '+'ae G g G g K k Q q Q q 3 3 J dz dZ DZ g G h p N n A a AE ae O o I '+'i O o O o T t 3 3 H h O o O o O o A C c L T s Q q R r Y y e 3 3 3 '+'3 j i I I I h w R r R R r r u v A M Y Y B G H j K L q ? c dz d3 dz '+'ts tf tc fn ls lz ww u u h h j r r r R W Y x Y 1 s x c h m r t v x '+'c c c I O Y O K A M N E O TT P E T Y O X Y O I Y a e n i v a b y d '+'e c n 0 1 k j u v c o tt p s o t u q X Y w i u o u w b e Y Y Y O w '+'x Q q C c F f N N W w q q h e S s X x 6 6 t t x e c j O E E p p C '+'M M p C C C Hb Th K N Y U K jI M H O TT b bI b E IO R K JI M H O N '+'b bI b e io r Hb h k n y u mY my Im Im 3 3 O o W w W W H H B b P p '+'K k K k K k K k H h H h Ih ih O o C c T t Y y Y y X x TI ti H h H '+'h H h E e E e I X x K k jt jt H h H h H h M m l A a A a AE ae E e '+'e e E e X X 3 3 3 3 N n N n O o O o O o E e Y y Y y Y y H h R r bI '+'bi F f X x X x H h G g T t Q q W w d r L Iu O y m o N U Y S d h l '+'lu d y w 2 n u y un').split(' ');var map={};for(var index=0,length=unicode.length;index<length;index+=1){map[unicode[index]]=replacement[index];}
$.url.map=map;})(this.jQuery,this);
this.jQuery.date={METHODS:{"yyyy":"getUTCFullYear","MM":"getUTCMonth","dd":"getUTCDate","HH":"getUTCHours","mm":"getUTCMinutes","ss":"getUTCSeconds","fff":"getUTCMilliseconds"},ISO8601:"yyyy-MM-ddTHH:mm:ss.fffZ",CKAN8601:"yyyy-MM-ddTHH:mm:ss",format:function(format,date){var map=this.METHODS;date=date||new Date();function pad(str,exp){str=""+str;exp=exp.replace(/[a-z]/ig,'0');return str.length!==exp.length?exp.slice(str.length)+str:str;}
return format.replace(/([a-zA-Z])\1+/g,function(_,$1){if(map[_]){var value=date[map[_]]();if(_==='MM'){value+=1;}
return pad(value,_);}
return _;});},toCKANString:function(date){return this.format(this.CKAN8601,date);},toISOString:function(date){date=date||new Date();if(date.toISOString){return date.toISOString();}else{return this.format(this.ISO8601,date);}}};
(function($){function onChange(event){var value=this.value;var updated=$.url.slugify(value,true);if(value!==updated){this.value=updated;$(this).trigger('slugify',[this.value,value]);}}
function onKeypress(event){if(!event.charCode){return;}
event.preventDefault();var value=this.value;var start=this.selectionStart;var end=this.selectionEnd;var char=String.fromCharCode(event.charCode);var updated;var range;if(this.setSelectionRange){updated=value.substring(0,start)+char+value.substring(end,value.length);this.value=$.url.slugify(updated,false);this.setSelectionRange(start+1,start+1);}else if(document.selection&&document.selection.createRange){range=document.selection.createRange();range.text=char+range.text;}
$(this).trigger('slugify',[this.value,value]);}
$.fn.slug=function(){return this.each(function(){$(this).on({'blur.slug':onChange,'change.slug':onChange,'keypress.slug':onKeypress});});};$.extend($.fn.slug,{onChange:onChange,onKeypress:onKeypress});})(this.jQuery);
(function($,window){var escape=$.url.escape;function slugPreview(options){options=$.extend(true,slugPreview.defaults,options||{});var collected=this.map(function(){var element=$(this);var field=element.find('input');var preview=$(options.template);var value=preview.find('.slug-preview-value');function setValue(){var val=escape(field.val())||options.placeholder;value.text(val);}
preview.find('strong').text(options.i18n['URL']+':');preview.find('.slug-preview-prefix').text(options.prefix);preview.find('button').text(options.i18n['Edit']).click(function(event){event.preventDefault();element.show();preview.hide();});setValue();field.on('change',setValue);element.after(preview).hide();return preview[0];});return this.pushStack(collected);}
slugPreview.defaults={prefix:'',placeholder:'',i18n:{'URL':'URL','Edit':'Edit'},template:['<div class="slug-preview">','<strong></strong>','<span class="slug-preview-prefix"></span><span class="slug-preview-value"></span>','<button class="btn btn-mini"></button>','</div>'].join('\n')};$.fn.slugPreview=slugPreview;})(this.jQuery,this);
(function($){var trailing_whitespace=true;$.fn.truncate=function(options){var opts=$.extend({},$.fn.truncate.defaults,options);var collected=this.map(function(){var content_length=$.trim(squeeze($(this).text())).length;if(content_length<=opts.max_length)
return;var actual_max_length=opts.max_length-opts.more.length-opts.link_prefix.length-opts.link_suffix.length;var truncated_node=recursivelyTruncate(this,actual_max_length);var full_node=$(this).hide();truncated_node.insertAfter(full_node);findNodeForMore(truncated_node).append(opts.ellipses+opts.link_prefix+'<a href="#more" class="'+opts.css_more_class+'">'+opts.more+'</a>'+opts.link_suffix);findNodeForLess(full_node).append(opts.link_prefix+'<a href="#less" class="'+opts.css_less_class+'">'+opts.less+'</a>'+opts.link_suffix);truncated_node.find('a:last').click(function(event){event.preventDefault();truncated_node.hide();full_node.show();truncated_node.trigger({type:'expand.truncate',relatedTarget:full_node[0]});});full_node.find('a:last').click(function(event){event.preventDefault();truncated_node.show();full_node.hide();truncated_node.trigger({type:'collapse.truncate',relatedTarget:full_node[0]});});return truncated_node[0];});return this.pushStack(collected);}
$.fn.truncate.defaults={max_length:100,more:'more',less:'less',ellipses:'…',css_more_class:'truncator-link truncator-more',css_less_class:'truncator-link truncator-less',link_prefix:' (',link_suffix:')'};function recursivelyTruncate(node,max_length){return(node.nodeType==3)?truncateText(node,max_length):truncateNode(node,max_length);}
function truncateNode(node,max_length){var node=$(node);var new_node=node.clone().empty();var truncatedChild;node.contents().each(function(){var remaining_length=max_length-new_node.text().length;if(remaining_length==0)return;truncatedChild=recursivelyTruncate(this,remaining_length);if(truncatedChild)new_node.append(truncatedChild);});return new_node;}
function truncateText(node,max_length){var text=squeeze(node.data);if(trailing_whitespace)
text=text.replace(/^ /,'');trailing_whitespace=!!text.match(/ $/);var text=text.slice(0,max_length);text=$('<div/>').text(text).html();return text;}
function squeeze(string){return string.replace(/\s+/g,' ');}
function findNodeForMore(node){var $node=$(node);var last_child=$node.children(":last");if(!last_child)return node;var display=last_child.css('display');if(!display||display=='inline')return $node;return findNodeForMore(last_child);};function findNodeForLess(node){var $node=$(node);var last_child=$node.children(":last");if(last_child&&last_child.is('p'))return last_child;return node;};})(jQuery);
/**
 * jQuery Masonry v2.1.08
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */

/*jshint browser: true, curly: true, eqeqeq: true, forin: false, immed: false, newcap: true, noempty: true, strict: true, undef: true */
/*global jQuery: false */

(function( window, $, undefined ){

  'use strict';

  /*
   * smartresize: debounced resize event for jQuery
   *
   * latest version and complete README available on Github:
   * https://github.com/louisremi/jquery.smartresize.js
   *
   * Copyright 2011 @louis_remi
   * Licensed under the MIT license.
   */

  var $event = $.event,
      resizeTimeout;

  $event.special.smartresize = {
    setup: function() {
      $(this).bind( "resize", $event.special.smartresize.handler );
    },
    teardown: function() {
      $(this).unbind( "resize", $event.special.smartresize.handler );
    },
    handler: function( event, execAsap ) {
      // Save the context
      var context = this,
          args = arguments;

      // set correct event type
      event.type = "smartresize";

      if ( resizeTimeout ) { clearTimeout( resizeTimeout ); }
      resizeTimeout = setTimeout(function() {
        $event.dispatch.apply( context, args );

      }, execAsap === "execAsap"? 0 : 100 );
    }
  };

  $.fn.smartresize = function( fn ) {
    return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
  };



// ========================= Masonry ===============================


  // our "Widget" object constructor
  $.Mason = function( options, element ){
    this.element = $( element );

    this._create( options );
    this._init();
  };

  $.Mason.settings = {
    isResizable: true,
    isAnimated: false,
    animationOptions: {
      queue: false,
      duration: 500
    },
    gutterWidth: 0,
    isRTL: false,
    isFitWidth: false,
    containerStyle: {
      position: 'relative'
    }
  };

  $.Mason.prototype = {

    _filterFindBricks: function( $elems ) {
      var selector = this.options.itemSelector;
      // if there is a selector
      // filter/find appropriate item elements
      return !selector ? $elems : $elems.filter( selector ).add( $elems.find( selector ) );
    },

    _getBricks: function( $elems ) {
      var $bricks = this._filterFindBricks( $elems )
        .css({ position: 'absolute' })
        .addClass('masonry-brick');
      return $bricks;
    },
    
    // sets up widget
    _create : function( options ) {
      
      this.options = $.extend( true, {}, $.Mason.settings, options );
      this.styleQueue = [];

      // get original styles in case we re-apply them in .destroy()
      var elemStyle = this.element[0].style;
      this.originalStyle = {
        // get height
        height: elemStyle.height || ''
      };
      // get other styles that will be overwritten
      var containerStyle = this.options.containerStyle;
      for ( var prop in containerStyle ) {
        this.originalStyle[ prop ] = elemStyle[ prop ] || '';
      }

      this.element.css( containerStyle );

      this.horizontalDirection = this.options.isRTL ? 'right' : 'left';

      var x = this.element.css( 'padding-' + this.horizontalDirection );
      var y = this.element.css( 'padding-top' );
      this.offset = {
        x: x ? parseInt( x, 10 ) : 0,
        y: y ? parseInt( y, 10 ) : 0
      };
      
      this.isFluid = this.options.columnWidth && typeof this.options.columnWidth === 'function';

      // add masonry class first time around
      var instance = this;
      setTimeout( function() {
        instance.element.addClass('masonry');
      }, 0 );
      
      // bind resize method
      if ( this.options.isResizable ) {
        $(window).bind( 'smartresize.masonry', function() { 
          instance.resize();
        });
      }


      // need to get bricks
      this.reloadItems();

    },
  
    // _init fires when instance is first created
    // and when instance is triggered again -> $el.masonry();
    _init : function( callback ) {
      this._getColumns();
      this._reLayout( callback );
    },

    option: function( key, value ){
      // set options AFTER initialization:
      // signature: $('#foo').bar({ cool:false });
      if ( $.isPlainObject( key ) ){
        this.options = $.extend(true, this.options, key);
      } 
    },
    
    // ====================== General Layout ======================

    // used on collection of atoms (should be filtered, and sorted before )
    // accepts atoms-to-be-laid-out to start with
    layout : function( $bricks, callback ) {

      // place each brick
      for (var i=0, len = $bricks.length; i < len; i++) {
        this._placeBrick( $bricks[i] );
      }
      
      // set the size of the container
      var containerSize = {};
      containerSize.height = Math.max.apply( Math, this.colYs );
      if ( this.options.isFitWidth ) {
        var unusedCols = 0;
        i = this.cols;
        // count unused columns
        while ( --i ) {
          if ( this.colYs[i] !== 0 ) {
            break;
          }
          unusedCols++;
        }
        // fit container to columns that have been used;
        containerSize.width = (this.cols - unusedCols) * this.columnWidth - this.options.gutterWidth;
      }
      this.styleQueue.push({ $el: this.element, style: containerSize });

      // are we animating the layout arrangement?
      // use plugin-ish syntax for css or animate
      var styleFn = !this.isLaidOut ? 'css' : (
            this.options.isAnimated ? 'animate' : 'css'
          ),
          animOpts = this.options.animationOptions;

      // process styleQueue
      var obj;
      for (i=0, len = this.styleQueue.length; i < len; i++) {
        obj = this.styleQueue[i];
        obj.$el[ styleFn ]( obj.style, animOpts );
      }

      // clear out queue for next time
      this.styleQueue = [];

      // provide $elems as context for the callback
      if ( callback ) {
        callback.call( $bricks );
      }
      
      this.isLaidOut = true;
    },
    
    // calculates number of columns
    // i.e. this.columnWidth = 200
    _getColumns : function() {
      var container = this.options.isFitWidth ? this.element.parent() : this.element,
          containerWidth = container.width();

                         // use fluid columnWidth function if there
      this.columnWidth = this.isFluid ? this.options.columnWidth( containerWidth ) :
                    // if not, how about the explicitly set option?
                    this.options.columnWidth ||
                    // or use the size of the first item
                    this.$bricks.outerWidth(true) ||
                    // if there's no items, use size of container
                    containerWidth;

      this.columnWidth += this.options.gutterWidth;

      this.cols = Math.floor( ( containerWidth + this.options.gutterWidth ) / this.columnWidth );
      this.cols = Math.max( this.cols, 1 );

    },

    // layout logic
    _placeBrick: function( brick ) {
      var $brick = $(brick),
          colSpan, groupCount, groupY, groupColY, j;

      //how many columns does this brick span
      colSpan = Math.ceil( $brick.outerWidth(true) / this.columnWidth );
      colSpan = Math.min( colSpan, this.cols );

      if ( colSpan === 1 ) {
        // if brick spans only one column, just like singleMode
        groupY = this.colYs;
      } else {
        // brick spans more than one column
        // how many different places could this brick fit horizontally
        groupCount = this.cols + 1 - colSpan;
        groupY = [];

        // for each group potential horizontal position
        for ( j=0; j < groupCount; j++ ) {
          // make an array of colY values for that one group
          groupColY = this.colYs.slice( j, j+colSpan );
          // and get the max value of the array
          groupY[j] = Math.max.apply( Math, groupColY );
        }

      }

      // get the minimum Y value from the columns
      var minimumY = Math.min.apply( Math, groupY ),
          shortCol = 0;
      
      // Find index of short column, the first from the left
      for (var i=0, len = groupY.length; i < len; i++) {
        if ( groupY[i] === minimumY ) {
          shortCol = i;
          break;
        }
      }

      // position the brick
      var position = {
        top: minimumY + this.offset.y
      };
      // position.left or position.right
      position[ this.horizontalDirection ] = this.columnWidth * shortCol + this.offset.x;
      this.styleQueue.push({ $el: $brick, style: position });

      // apply setHeight to necessary columns
      var setHeight = minimumY + $brick.outerHeight(true),
          setSpan = this.cols + 1 - len;
      for ( i=0; i < setSpan; i++ ) {
        this.colYs[ shortCol + i ] = setHeight;
      }

    },
    
    
    resize: function() {
      var prevColCount = this.cols;
      // get updated colCount
      this._getColumns();
      if ( this.isFluid || this.cols !== prevColCount ) {
        // if column count has changed, trigger new layout
        this._reLayout();
      }
    },
    
    
    _reLayout : function( callback ) {
      // reset columns
      var i = this.cols;
      this.colYs = [];
      while (i--) {
        this.colYs.push( 0 );
      }
      // apply layout logic to all bricks
      this.layout( this.$bricks, callback );
    },
    
    // ====================== Convenience methods ======================
    
    // goes through all children again and gets bricks in proper order
    reloadItems : function() {
      this.$bricks = this._getBricks( this.element.children() );
    },
    
    
    reload : function( callback ) {
      this.reloadItems();
      this._init( callback );
    },
    

    // convienence method for working with Infinite Scroll
    appended : function( $content, isAnimatedFromBottom, callback ) {
      if ( isAnimatedFromBottom ) {
        // set new stuff to the bottom
        this._filterFindBricks( $content ).css({ top: this.element.height() });
        var instance = this;
        setTimeout( function(){
          instance._appended( $content, callback );
        }, 1 );
      } else {
        this._appended( $content, callback );
      }
    },
    
    _appended : function( $content, callback ) {
      var $newBricks = this._getBricks( $content );
      // add new bricks to brick pool
      this.$bricks = this.$bricks.add( $newBricks );
      this.layout( $newBricks, callback );
    },
    
    // removes elements from Masonry widget
    remove : function( $content ) {
      this.$bricks = this.$bricks.not( $content );
      $content.remove();
    },
    
    // destroys widget, returns elements and container back (close) to original style
    destroy : function() {

      this.$bricks
        .removeClass('masonry-brick')
        .each(function(){
          this.style.position = '';
          this.style.top = '';
          this.style.left = '';
        });
      
      // re-apply saved container styles
      var elemStyle = this.element[0].style;
      for ( var prop in this.originalStyle ) {
        elemStyle[ prop ] = this.originalStyle[ prop ];
      }

      this.element
        .unbind('.masonry')
        .removeClass('masonry')
        .removeData('masonry');
      
      $(window).unbind('.masonry');

    }
    
  };
  
  
  // ======================= imagesLoaded Plugin ===============================
  /*!
   * jQuery imagesLoaded plugin v1.1.0
   * http://github.com/desandro/imagesloaded
   *
   * MIT License. by Paul Irish et al.
   */


  // $('#my-container').imagesLoaded(myFunction)
  // or
  // $('img').imagesLoaded(myFunction)

  // execute a callback when all images have loaded.
  // needed because .load() doesn't work on cached images

  // callback function gets image collection as argument
  //  `this` is the container

  $.fn.imagesLoaded = function( callback ) {
    var $this = this,
        $images = $this.find('img').add( $this.filter('img') ),
        len = $images.length,
        blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        loaded = [];

    function triggerCallback() {
      callback.call( $this, $images );
    }

    function imgLoaded( event ) {
      var img = event.target;
      if ( img.src !== blank && $.inArray( img, loaded ) === -1 ){
        loaded.push( img );
        if ( --len <= 0 ){
          setTimeout( triggerCallback );
          $images.unbind( '.imagesLoaded', imgLoaded );
        }
      }
    }

    // if no images, trigger immediately
    if ( !len ) {
      triggerCallback();
    }

    $images.bind( 'load.imagesLoaded error.imagesLoaded',  imgLoaded ).each( function() {
      // cached images don't fire load sometimes, so we reset src.
      var src = this.src;
      // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      // data uri bypasses webkit log warning (thx doug jones)
      this.src = blank;
      this.src = src;
    });

    return $this;
  };


  // helper function for logging errors
  // $.error breaks jQuery chaining
  var logError = function( message ) {
    if ( window.console ) {
      window.console.error( message );
    }
  };
  
  // =======================  Plugin bridge  ===============================
  // leverages data method to either create or return $.Mason constructor
  // A bit from jQuery UI
  //   https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js
  // A bit from jcarousel 
  //   https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

  $.fn.masonry = function( options ) {
    if ( typeof options === 'string' ) {
      // call method
      var args = Array.prototype.slice.call( arguments, 1 );

      this.each(function(){
        var instance = $.data( this, 'masonry' );
        if ( !instance ) {
          logError( "cannot call methods on masonry prior to initialization; " +
            "attempted to call method '" + options + "'" );
          return;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
          logError( "no such method '" + options + "' for masonry instance" );
          return;
        }
        // apply method
        instance[ options ].apply( instance, args );
      });
    } else {
      this.each(function() {
        var instance = $.data( this, 'masonry' );
        if ( instance ) {
          // apply options & init
          instance.option( options || {} );
          instance._init();
        } else {
          // initialize new instance
          $.data( this, 'masonry', new $.Mason( options, this ) );
        }
      });
    }
    return this;
  };

})( window, jQuery );
(function(jQuery){jQuery.fn.incompleteFormWarning=function(message){return this.each(function(){var form=jQuery(this);var state=form.serialize();function onWindowUnload(event){if(event.originalEvent.returnValue){event.originalEvent.returnValue=message;}
return message;}
form.on({change:function(){var method=form.serialize()===state?'off':'on';jQuery(window)[method]('beforeunload',onWindowUnload);},submit:function(){jQuery(window).off('beforeunload',onWindowUnload);}});});};})(this.jQuery);
this.ckan=this.ckan||{};(function(ckan,$){var callbacks=[];function Sandbox(callbacks){var index=0;var length=callbacks?callbacks.length:0;for(;index<length;index+=1){callbacks[index](this);}}
$.extend(Sandbox.prototype,{jQuery:$,ajax:$.ajax,body:$(document.body),location:window.location,window:window});function sandbox(element,options){return new sandbox.Sandbox(ckan.sandbox.callbacks);}
sandbox.extend=function(props){$.extend(Sandbox.prototype,props||{});return ckan;};sandbox.setup=function setup(fn){var callbacks=ckan.sandbox.callbacks=ckan.sandbox.callbacks||[];if(typeof fn==='function'){callbacks.push(fn);}else{throw new Error('ckan.sandbox.setup() must be passed a function');}
return ckan;};ckan.sandbox=sandbox;ckan.sandbox.Sandbox=Sandbox;})(this.ckan,this.jQuery);
this.ckan=this.ckan||{};(function(ckan,jQuery,window){var MODULE_PREFIX='data-module';var MODULE_OPTION_PREFIX='data-module-';function BaseModule(el,options,sandbox){this.el=el instanceof jQuery?el:jQuery(el);this.options=jQuery.extend(true,{},this.options,options);this.sandbox=sandbox;}
jQuery.extend(BaseModule.prototype,{el:null,options:null,$:function(selector){return this.el.find(selector);},i18n:function(key){var args=[].slice.call(arguments,1);var i18n=this.options.i18n;var trans=(i18n&&i18n[key])||key;if(typeof trans==='function'){trans=trans.apply(null,args);}
return typeof trans.fetch==='function'?trans.fetch.apply(trans,args):trans;},initialize:function(){},teardown:function(){},remove:function(){this.teardown();this.el.remove();}});function module(name,properties){if(module.registry[name]){throw new Error('There is already a module registered as "'+name+'"');}
if(typeof properties==='function'){properties=properties(jQuery,ckan.i18n.translate,ckan.i18n);}
properties=jQuery.extend({constructor:function Module(){BaseModule.apply(this,arguments);}},properties);module.registry[name]=jQuery.inherit(BaseModule,properties,{namespace:name});return ckan;}
module.registry={};module.instances={};module.initialize=function(){ckan.pubsub.enqueue();jQuery('[data-module]',document.body).each(function(index,element){module.initializeElement(this);});ckan.pubsub.dequeue();return module;};module.initializeElement=function(element){var registry=module.registry;var names=jQuery.trim(element.getAttribute(MODULE_PREFIX)).split(' ');jQuery.each(names,function(index,name){var Module=registry[name];if(Module&&typeof Module==='function'){module.createInstance(Module,element);}});};module.createInstance=function(Module,element){var options=module.extractOptions(element);var sandbox=ckan.sandbox(element,options);var instance=new Module(element,options,sandbox);if(typeof instance.initialize==='function'){instance.initialize();}
var instances=module.instances[Module.namespace]||[];instances.push(instance);module.instances[Module.namespace]=instances;};module.extractOptions=function(element){var attrs=element.attributes;var index=0;var length=attrs.length;var options={};var prop;var attr;var value;for(;index<length;index+=1){attr=attrs[index];if(attr.name.indexOf(MODULE_OPTION_PREFIX)===0){prop=attr.name.slice(MODULE_OPTION_PREFIX.length);try{value=attr.value===""?true:jQuery.parseJSON(attr.value);}catch(error){value=attr.value;}
options[jQuery.camelCase(prop)]=value;}}
return options;};ckan.module=module;ckan.module.BaseModule=BaseModule;})(this.ckan,this.jQuery,this);
this.ckan=this.ckan||{};(function(ckan,$){var pubsub={events:$({}),queue:null,publish:function(topic){if(pubsub.queue){pubsub.queue.push([].slice.call(arguments));}else{pubsub.events.triggerHandler(topic,[].slice.call(arguments,1));}
return this;},subscribe:function(topic,callback){if($.isPlainObject(topic)){$.each(topic,$.proxy(pubsub.subscribe,this));return this;}
function wrapper(){return callback.apply(this,[].slice.call(arguments,1));}
wrapper.guid=callback.guid=callback.guid||($.guid+=1);pubsub.events.on(topic,wrapper);return this;},unsubscribe:function(topic,callback){pubsub.events.off(topic,arguments);return this;},enqueue:function(){if(!pubsub.queue){pubsub.queue=[];}
return this;},dequeue:function(){if(pubsub.queue){var queue=pubsub.queue;var index=0;var length=queue.length;pubsub.queue=null;for(;index<length;index+=1){pubsub.publish.apply(pubsub,queue[index]);}}
return this;}};ckan.pubsub=pubsub;ckan.sandbox.extend({publish:pubsub.publish,subscribe:pubsub.subscribe,unsubscribe:pubsub.unsubscribe});})(this.ckan,this.jQuery);
(function(ckan,jQuery){function Client(options){this.endpoint=options&&options.endpoint||'';jQuery.proxyAll(this,/parse/);}
jQuery.extend(Client.prototype,{url:function(path){if(!(/^https?:\/\//i).test(path)){path=this.endpoint+'/'+encodeURI(path).replace(/^\//,'');}
return path;},call:function(type,path,data,fn,error){var url=this.url('/api/action/'+path);var error=(error=='undefined')?function(){}:error;var options={contentType:'application/json',url:url,dataType:'json',processData:false,success:fn,error:error};if(type=='POST'){options.type='POST';options.data=JSON.stringify(data);}else{options.type='GET';options.url+=data;}
jQuery.ajax(options);},getTemplate:function(filename,params,success,error){var url=this.url('/api/1/util/snippet/'+encodeURIComponent(filename));if(typeof params==='function'){error=success;success=params;params={};}
return jQuery.get(url,params||{}).then(success,error);},getLocaleData:function(locale,success,error){var url=this.url('/api/i18n/'+(locale||''));return jQuery.getJSON(url).then(success,error);},getCompletions:function(url,options,success,error){if(typeof options==='function'){error=success;success=options;options={};}
var formatter=options&&options.format||this.parseCompletions;var request=jQuery.ajax({url:this.url(url)});return request.pipe(formatter).promise(request).then(success,error);},parseCompletions:function(data,options){if(typeof data==='string'){return this.parsePackageCompletions(data,options);}
var map={};var raw=jQuery.isArray(data)?data:data.ResultSet&&data.ResultSet.Result||{};var items=jQuery.map(raw,function(item){var key=typeof options.key!='undefined'?item[options.key]:false;var label=typeof options.label!='undefined'?item[options.label]:false;item=typeof item==='string'?item:item.name||item.Name||item.Format||'';item=jQuery.trim(item);key=key?key:item;label=label?label:item;var lowercased=item.toLowerCase();var returnObject=options&&options.objects===true;if(lowercased&&!map[lowercased]){map[lowercased]=1;return returnObject?{id:key,text:label}:item;}
return null;});items=jQuery.grep(items,function(item){return item!==null;});return items;},parseCompletionsForPlugin:function(data){return{results:this.parseCompletions(data,{objects:true})};},parsePackageCompletions:function(string,options){var packages=jQuery.trim(string).split('\n');var parsed=[];return jQuery.map(packages,function(pkg){var parts=pkg.split('|');var id=jQuery.trim(parts.pop()||'');var text=jQuery.trim(parts.join('|')||'');return options&&options.objects===true?{id:id,text:text}:id;});},getStorageAuth:function(key,success,error){if(!key){throw new Error('Client#getStorageAuth() must be called with a key');}
return jQuery.ajax({url:this.url('/api/storage/auth/form/'+key),success:success,error:error});},getStorageMetadata:function(key,success,error){if(!key){throw new Error('Client#getStorageMetadata() must be called with a key');}
return jQuery.ajax({url:this.url('/api/storage/metadata/'+key),success:success,error:error});},convertStorageMetadataToResource:function(meta){var modified=new Date(this.normalizeTimestamp(meta._last_modified));var created=new Date(this.normalizeTimestamp(meta._creation_date));var createdISO=jQuery.date.toCKANString(created);var modifiedISO=jQuery.date.toCKANString(modified);var filename=meta['filename-original']||meta.key;var format=meta._format||filename.split('.').pop();var url=meta._location;if(url.indexOf('://')===-1){url=ckan.url(url);}
return{url:url,key:meta.key,name:filename,size:meta._content_length,created:createdISO,last_modified:modifiedISO,format:format,mimetype:meta._format||null,resource_type:'file.upload',owner:meta['uploaded-by'],hash:meta._checksum,cache_url:meta._location,cache_url_updated:modifiedISO};},normalizeTimestamp:function(string){var tz=/[+\-]\d{4}|Z/;if(!tz.test(string)){string+='Z';}
return string;}});ckan.sandbox.setup(function(instance){instance.client=new Client({endpoint:ckan.API_ROOT});});ckan.Client=Client;})(this.ckan,this.jQuery);
(function(ckan,jQuery){function notify(title,message,type){var alert=notify.initialize(notify.create(title,message,type));notify.el.append(alert);}
notify.el=jQuery('.flash-messages',document.body);notify.create=function(title,message,type){var alert=jQuery('<div class="alert fade in"><strong></strong> <span></span></div>');alert.addClass('alert-'+(type||'error'));alert.find('strong').text(title);alert.find('span').text(message);return alert;};notify.initialize=function(element){element=element instanceof jQuery?element:jQuery(element);return element.append(jQuery('<a class="close" href="#">&times;</a>')).alert();};notify.el.find('.alert').each(function(){notify.initialize(this);});notify.el.on('click','.close',function(){jQuery(this).parent().alert('close');});ckan.notify=notify;ckan.sandbox.extend({notify:notify});})(this.ckan,this.jQuery);
this.ckan=this.ckan||{};(function(ckan,jQuery,Jed){var domain={"":{"domain":"ckan","lang":"en","plural_forms":"nplurals=2; plural=(n != 1);"}};ckan.i18n=new Jed({domain:'ckan',locale_data:{ckan:domain}});ckan.i18n.translate=jQuery.proxy(ckan.i18n.translate,ckan.i18n);ckan.i18n.load=function(data){if(data&&data['']){jQuery.extend(domain,data);;}};ckan.sandbox.extend({i18n:ckan.i18n,translate:ckan.i18n.translate});})(this.ckan,this.jQuery,this.Jed);
this.ckan=this.ckan||{};(function(ckan,jQuery){ckan.PRODUCTION='production';ckan.DEVELOPMENT='development';ckan.TESTING='testing';ckan.initialize=function(){var body=jQuery('body');var locale=jQuery('html').attr('lang');var location=window.location;var root=location.protocol+'//'+location.host;function getRootFromData(key){return(body.data(key)||root).replace(/\/$/,'');}
ckan.SITE_ROOT=getRootFromData('siteRoot');ckan.LOCALE_ROOT=getRootFromData('localeRoot');ckan.API_ROOT=getRootFromData('apiRoot');ckan.sandbox().client.getLocaleData(locale).done(function(data){ckan.i18n.load(data);ckan.module.initialize();});};ckan.url=function(path,includeLocale){if(typeof path==='boolean'){includeLocale=path;path=null;}
path=(path||'').replace(/^\//,'');var root=includeLocale?ckan.LOCALE_ROOT:ckan.SITE_ROOT;return path?root+'/'+path:root;};ckan.sandbox.extend({url:ckan.url});if(ckan.ENV!==ckan.TESTING){jQuery(function(){ckan.initialize();});}})(this.ckan,this.jQuery);this.jQuery.fn.ie7redraw=function(){if(jQuery.browser.msie&&jQuery.browser.version=='7.0'){jQuery(this).css('zoom',1);}};
this.ckan.module('select-switch',{options:{target:'select'},initialize:function(){var _this=this;this.el.on('change',this.options.target,function(){_this.el.submit();});}});
this.ckan.module('slug-preview-target',{initialize:function(){var sandbox=this.sandbox;var options=this.options;var el=this.el;sandbox.subscribe('slug-preview-created',function(preview){el.after(preview);});sandbox.subscribe('slug-preview-modified',function(){el.off('.slug-preview');});el.on('keyup.slug-preview',function(event){sandbox.publish('slug-target-changed',this.value);});}});this.ckan.module('slug-preview-slug',function(jQuery,_){return{options:{prefix:'',placeholder:'<slug>',i18n:{url:_('URL'),edit:_('Edit')}},initialize:function(){var sandbox=this.sandbox;var options=this.options;var el=this.el;var _=sandbox.translate;var slug=el.slug();var parent=slug.parents('.control-group');var preview;if(!(parent.length)){return;}
if(!parent.hasClass('error')){preview=parent.slugPreview({prefix:options.prefix,placeholder:options.placeholder,i18n:{'URL':this.i18n('url'),'Edit':this.i18n('edit')}});slug.keypress(function(){if(event.charCode){sandbox.publish('slug-preview-modified',preview[0]);}});sandbox.publish('slug-preview-created',preview[0]);if(jQuery.browser.msie&&jQuery.browser.version=='7.0'){jQuery('.btn').on('click',preview,function(){jQuery('.controls').ie7redraw();});preview.hide();setTimeout(function(){preview.show();jQuery('.controls').ie7redraw();},10);}}
sandbox.subscribe('slug-target-changed',function(value){slug.val(value).trigger('change');});}};});
this.ckan.module('basic-form',function(jQuery,_){return{initialize:function(){var message=_('There are unsaved modifications to this form').fetch();this.el.incompleteFormWarning(message);}};});
this.ckan.module('confirm-action',function(jQuery,_){return{options:{i18n:{heading:_('Please Confirm Action'),content:_('Are you sure you want to perform this action?'),confirm:_('Confirm'),cancel:_('Cancel')},template:['<div class="modal">','<div class="modal-header">','<button type="button" class="close" data-dismiss="modal">×</button>','<h3></h3>','</div>','<div class="modal-body"></div>','<div class="modal-footer">','<button class="btn btn-cancel"></button>','<button class="btn btn-primary"></button>','</div>','</div>'].join('\n')},initialize:function(){jQuery.proxyAll(this,/_on/);this.el.on('click',this._onClick);},confirm:function(){this.sandbox.body.append(this.createModal());this.modal.modal('show');this.modal.css('margin-top',this.modal.height()*-0.5);},performAction:function(){var form=jQuery('<form/>',{action:this.el.attr('href'),method:'POST'});form.appendTo('body').submit();},createModal:function(){if(!this.modal){var element=this.modal=jQuery(this.options.template);element.on('click','.btn-primary',this._onConfirmSuccess);element.on('click','.btn-cancel',this._onConfirmCancel);element.modal({show:false});element.find('h3').text(this.i18n('heading'));element.find('.modal-body').text(this.i18n('content'));element.find('.btn-primary').text(this.i18n('confirm'));element.find('.btn-cancel').text(this.i18n('cancel'));}
return this.modal;},_onClick:function(event){event.preventDefault();this.confirm();},_onConfirmSuccess:function(event){this.performAction();},_onConfirmCancel:function(event){this.modal.modal('hide');}};});
this.ckan.module('api-info',function(jQuery,_){return{modal:null,options:{template:null,i18n:{noTemplate:_('There is no API data to load for this resource'),loadError:_('Failed to load data API information')}},initialize:function(){jQuery.proxyAll(this,/_on/);this.el.on('click',this._onClick);this.el.button();},loading:function(loading){this.el.button(loading!==false?'loading':'reset');},show:function(){var sandbox=this.sandbox,module=this;if(this.modal){return this.modal.modal('show');}
this.loadTemplate().done(function(html){module.modal=jQuery(html);module.modal.find('.modal-header :header').append('<button class="close" data-dismiss="modal">×</button>');module.modal.modal().appendTo(sandbox.body);});},hide:function(){if(this.modal){this.modal.modal('hide');}},loadTemplate:function(){if(!this.options.template){this.sandbox.notify(this.i18n('noTemplate'));return jQuery.Deferred().reject().promise();}
if(!this.promise){this.loading();this.promise=jQuery.get(this.options.template);this.promise.then(this._onTemplateSuccess,this._onTemplateError);}
return this.promise;},_onClick:function(event){event.preventDefault();this.show();},_onTemplateSuccess:function(){this.loading(false);},_onTemplateError:function(){this.loading(false);this.sandbox.notify(this.i18n('loadError'));}};});
this.ckan.module('autocomplete',function(jQuery,_){return{options:{tags:false,key:false,label:false,items:10,source:null,interval:1000,dropdownClass:'',containerClass:'',i18n:{noMatches:_('No matches found'),emptySearch:_('Start typing…'),inputTooShort:function(data){return _('Input is too short, must be at least one character').ifPlural(data.min,'Input is too short, must be at least %(min)d characters');}}},initialize:function(){jQuery.proxyAll(this,/_on/,/format/);this.setupAutoComplete();},setupAutoComplete:function(){var settings={width:'resolve',formatResult:this.formatResult,formatNoMatches:this.formatNoMatches,formatInputTooShort:this.formatInputTooShort,dropdownCssClass:this.options.dropdownClass,containerCssClass:this.options.containerClass};if(!this.el.is('select')){if(this.options.tags){settings.tags=this._onQuery;}else{settings.query=this._onQuery;settings.createSearchChoice=this.formatTerm;}
settings.initSelection=this.formatInitialValue;}
var select2=this.el.select2(settings).data('select2');if(this.options.tags&&select2&&select2.search){select2.search.on('keydown',this._onKeydown);}},getCompletions:function(string,fn){var parts=this.options.source.split('?');var end=parts.pop();var source=parts.join('?')+encodeURIComponent(string)+end;var client=this.sandbox.client;var options={format:function(data){var completion_options=jQuery.extend(options,{objects:true});return{results:client.parseCompletions(data,completion_options)}},key:this.options.key,label:this.options.label};return client.getCompletions(source,options,fn);},lookup:function(string,fn){var module=this;this._lastTerm=string;if(string){if(!this._debounced){this._debounced=setTimeout(function(){var term=module._lastTerm;delete module._debounced;if(module._last){module._last.abort();}
module._last=module.getCompletions(term,function(terms){fn(module._lastResults=terms);});},this.options.interval);}else{fn(this._lastResults||{results:[]});}}else{fn({results:[]});}},formatResult:function(state,container,query){var term=this._lastTerm||null;if(container){container.attr('data-value',state.id);}
return state.text.split(term).join(term&&term.bold());},formatNoMatches:function(term){return!term?this.i18n('emptySearch'):this.i18n('noMatches');},formatInputTooShort:function(term,min){return this.i18n('inputTooShort',{min:min});},formatTerm:function(term){term=jQuery.trim(term||'');return{id:term.replace(/,/g,'\u002C'),text:term};},formatInitialValue:function(element,callback){var value=jQuery.trim(element.val()||'');var formatted;if(this.options.tags){formatted=jQuery.map(value.split(","),this.formatTerm);}else{formatted=this.formatTerm(value);}
if(typeof callback==='function'){callback(formatted);}
return formatted;},_onQuery:function(options){if(options){this.lookup(options.term,options.callback);}},_onKeydown:function(event){if(event.which===188){event.preventDefault();setTimeout(function(){var e=jQuery.Event("keydown",{which:13});jQuery(event.target).trigger(e);},10);}}};});
this.ckan.module('custom-fields',function(jQuery,_){return{options:{fieldSelector:'.control-custom'},initialize:function(){if(!jQuery.browser.msie||!jQuery.browser.version=='7.0'){jQuery.proxyAll(this,/_on/);var delegated=this.options.fieldSelector+':last input:first';this.el.on('change',delegated,this._onChange);this.el.on('change',':checkbox',this._onRemove);this.$('.checkbox').addClass("btn btn-danger icon-remove");}},newField:function(element){this.el.append(this.cloneField(element));},cloneField:function(current){return this.resetField(jQuery(current).clone());},resetField:function(field){function increment(index,string){return(string||'').replace(/\d+/,function(int){return 1+parseInt(int,10);});}
var input=field.find(':input');input.val('').attr('id',increment).attr('name',increment);var label=field.find('label');label.text(increment).attr('for',increment);return field;},disableField:function(field,disable){field.toggleClass('disabled',disable!==false);field.find(':input:not(:checkbox)').prop('disabled',disable!==false);},_onChange:function(event){if(event.target.value!==''){var parent=jQuery(event.target).parents('.control-custom');this.newField(parent);}},_onRemove:function(event){var parent=jQuery(event.target).parents('.control-custom');this.disableField(parent,event.target.checked);}};});
this.ckan.module('related-item',function(jQuery,_){return{options:{truncate:55,truncateMore:null,truncateLess:null,truncatePrefix:'',truncateSuffix:'',truncateSelector:'.prose',expandedClass:'expanded',hasExpanderClass:'is-expander',i18n:{more:_('show more'),less:_('show less')}},initialize:function(){jQuery.proxyAll(this,/_on/);var options=this.options;this.description=this.$(options.truncateSelector);this.truncated=this.description.truncate({max_length:options.truncate,more:options.truncateMore||this.i18n('more'),less:options.truncateLess||this.i18n('less'),link_prefix:options.truncatePrefix,link_suffix:options.truncateSuffix});this.collapsedHeight=this.el.height();this.truncated.on('expand.truncate',this._onExpand);this.truncated.on('collapse.truncate',this._onCollapse);if($('.truncator-link',this.description).length>0){this.el.addClass(options.hasExpanderClass);}},_onExpand:function(){var diff=this.el.height()-this.collapsedHeight;this.el.addClass(this.options.expandedClass);this.el.css('margin-bottom',diff*-1);},_onCollapse:function(){this.el.removeClass(this.options.expandedClass);this.el.css('margin-bottom','');}};});
this.ckan.module('data-viewer',function(jQuery){return{options:{timeout:200,minHeight:400,padding:30},initialize:function(){jQuery.proxyAll(this,/_on/);this.el.on('load',this._onLoad);this._FirefoxFix();this.sandbox.subscribe('data-viewer-error',this._onDataViewerError);},_onDataViewerError:function(message){var parent=this.el.parent();$('.data-viewer-error .collapse',parent).html(message);$('.data-viewer-error',parent).removeClass('js-hide');this.el.hide();},_onLoad:function(){var self=this;var loc=$('body').data('site-root');if(this.el.attr('src').substring(0,loc.length)===loc){this._recalibrate();setInterval(function(){self._recalibrate();},this.options.timeout);}else{this.el.css('height',600);}},_recalibrate:function(){var height=this.el.contents().find('body').outerHeight(true);height=Math.max(height,this.options.minHeight);this.el.css('height',height+this.options.padding);},_FirefoxFix:function(){if(/#$/.test(this.el.src)){this.el.src=this.el.src.substr(0,this.src.length-1);}else{this.el.src=this.el.src+'#';}}};});
this.ckan.module('table-selectable-rows',function($,_){return{select_all:null,total_checkboxes:0,buttons:null,initialize:function(){$.proxyAll(this,/_on/);this.total_checkboxes=$('input[type="checkbox"]',this.el).length;this.select_all=$('<input type="checkbox">').data('select-all',true).appendTo($('thead th:first-child',this.el));this.el.on('change','input[type="checkbox"]',this._onHandleCheckboxToggle);this.buttons=$('th.actions .btn',this.el).addClass('disabled').prop('disabled',true);},_onHandleCheckboxToggle:function($e){var checkbox=$($e.target);if(checkbox.data('select-all')){this.handleSelectAll(checkbox,checkbox.is(':checked'));}else{this.handleSelectOne(checkbox,checkbox.is(':checked'));}},handleSelectAll:function($target,$checked){$('input[type="checkbox"]',this.el).prop('checked',$checked);if($checked){$('tbody tr',this.el).addClass('table-selected');this.buttons.removeClass('disabled').prop('disabled',false);}else{$('tbody tr',this.el).removeClass('table-selected');this.buttons.addClass('disabled').prop('disabled',true);}},handleSelectOne:function($target,$checked){if($checked){$target.parents('tr').addClass('table-selected');}else{$target.parents('tr').removeClass('table-selected');}
var checked=$('tbody input[type="checkbox"]:checked',this.el).length;if(checked>=this.total_checkboxes){this.select_all.prop('checked',true);}else{this.select_all.prop('checked',false);}
if(checked>0){this.buttons.removeClass('disabled').prop('disabled',false);}else{this.buttons.addClass('disabled').prop('disabled',true);}}};});
this.ckan.module('resource-form',function(jQuery,_){return{initialize:function(){jQuery.proxyAll(this,/_on/);this.sandbox.subscribe('resource:uploaded',this._onResourceUploaded);},teardown:function(){this.sandbox.unsubscribe('resource:uploaded',this._onResourceUploaded);},_onResourceUploaded:function(resource){var key;var field;for(key in resource){if(resource.hasOwnProperty(key)){field=this.$('[name="'+key+'"]');if(field.is(':checkbox, :radio')){this.$('[value="'+resource[key]+'"]').prop('checked',true);}else if(field.is('select')){field.prop('selected',resource[key]);}else{field.val(resource[key]);}}}}};});
this.ckan.module('resource-upload-field',function(jQuery,_,i18n){return{options:{form:{method:'POST',file:'file',params:[]},i18n:{label:_('Upload a file'),errorTitle:_('An Error Occurred'),uploadSuccess:_('Resource uploaded'),uploadError:_('Unable to upload file'),authError:_('Unable to authenticate upload'),metadataError:_('Unable to get data for uploaded file')},template:['<span class="resource-upload-field">','<i class="ckan-icon ckan-icon-link-plugin"></i>','<input type="file" />','<input id="field-resource-type-upload" type="radio" name="resource_type" value="file.upload" />','<label class="radio inline" for="field-resource-type-upload"></label>','</span>'].join('\n')},initialize:function(){jQuery.proxyAll(this,/_on/);this.upload=jQuery(this.options.template);this.setupFileUpload();this.el.append(this.upload);},setupFileUpload:function(){var options=this.options;this.upload.find('label').text(this.i18n('label'));this.upload.find('input[type=file]').fileupload({type:options.form.method,paramName:options.form.file,forceIframeTransport:true,replaceFileInput:true,autoUpload:false,add:this._onUploadAdd,send:this._onUploadSend,done:this._onUploadDone,fail:this._onUploadFail,always:this._onUploadComplete});},loading:function(show){this.upload.toggleClass('loading',show);},authenticate:function(key,data){data.key=key;var request=this.sandbox.client.getStorageAuth(key);var onSuccess=jQuery.proxy(this._onAuthSuccess,this,data);return request.then(onSuccess,this._onAuthError);},lookupMetadata:function(key,data){var request=this.sandbox.client.getStorageMetadata(key);var onSuccess=jQuery.proxy(this._onMetadataSuccess,this,data);return request.then(onSuccess,this._onMetadataError);},notify:function(message,type){var title=this.i18n('errorTitle');this.sandbox.notify(title,message,type);},generateKey:function(filename){var parts=filename.split('.');var extension=jQuery.url.slugify(parts.pop());filename=jQuery.url.slugify(parts.join('.'))+'.'+extension;return jQuery.date.toISOString()+'/'+filename;},_onUploadAdd:function(event,data){if(data.files&&data.files.length){var key=this.generateKey(data.files[0].name);this.authenticate(key,data);}},_onUploadFail:function(){this.sandbox.notify(this.i18n('uploadError'));},_onUploadSend:function(){this.loading();},_onUploadDone:function(event,data){var result=data.result;if(result&&!(jQuery.isPlainObject(result)&&result.error)){this.lookupMetadata(data.key,data);}else{this._onUploadFail(event,data);}},_onUploadComplete:function(){this.loading(false);},_onAuthSuccess:function(data,response){data.url=response.action;data.formData=this.options.form.params.concat(response.fields);data.submit();},_onAuthError:function(event,data){this.sandbox.notify(this.i18n('authError'));this._onUploadComplete();},_onMetadataSuccess:function(data,response){var resource=this.sandbox.client.convertStorageMetadataToResource(response);this.sandbox.notify(this.i18n('uploadSuccess'),'','success');this.sandbox.publish('resource:uploaded',resource);},_onMetadataError:function(){this.sandbox.notify(this.i18n('metadataError'));this._onUploadComplete();}};});
this.ckan.module('follow',function($,_){return{options:{action:null,type:null,id:null,loading:false,i18n:{follow:_('Follow'),unfollow:_('Unfollow')}},initialize:function(){$.proxyAll(this,/_on/);this.el.on('click',this._onClick);},_onClick:function(event){var options=this.options;if(options.action&&options.type&&options.id&&!options.loading){event.preventDefault();var client=this.sandbox.client;var path=options.action+'_'+options.type;options.loading=true;this.el.addClass('disabled');client.call('POST',path,{id:options.id},this._onClickLoaded);}},_onClickLoaded:function(json){var options=this.options;var sandbox=this.sandbox;options.loading=false;this.el.removeClass('disabled');if(options.action=='follow'){options.action='unfollow';this.el.html('<i class="icon-remove-sign"></i> '+this.i18n('unfollow')).removeClass('btn-success').addClass('btn-danger');}else{options.action='follow';this.el.html('<i class="icon-plus-sign"></i> '+this.i18n('follow')).removeClass('btn-danger').addClass('btn-success');}
sandbox.publish('follow-'+options.action+'-'+options.id);}};});
this.ckan.module('activity-stream',function($,_){return{options:{more:null,id:null,context:null,offset:null,loading:false,i18n:{loading:_('Loading...')}},initialize:function(){$.proxyAll(this,/_on/);var options=this.options;options.more=(options.more=='True');this._onBuildLoadMore();$(window).on('scroll',this._onScrollIntoView);this._onScrollIntoView();},elementInViewport:function(el){var top=el.offsetTop;var left=el.offsetLeft;var width=el.offsetWidth;var height=el.offsetHeight;while(el.offsetParent){el=el.offsetParent;top+=el.offsetTop;left+=el.offsetLeft;}
return(top<(window.pageYOffset+window.innerHeight)&&left<(window.pageXOffset+window.innerWidth)&&(top+height)>window.pageYOffset&&(left+width)>window.pageXOffset);},_onScrollIntoView:function(){var el=$('.load-more a',this.el);if(el.length==1){var in_viewport=this.elementInViewport(el[0]);if(in_viewport&&!this.options.loading){el.trigger('click');}}},_onBuildLoadMore:function(){var options=this.options;if(options.more){$('.load-more',this.el).on('click','a',this._onLoadMoreClick);options.offset=$('.item',this.el).length;}},_onLoadMoreClick:function(event){event.preventDefault();var options=this.options;if(!options.loading){options.loading=true;$('.load-more a',this.el).html(this.i18n('loading')).addClass('disabled');this.sandbox.client.call('GET',options.context+'_activity_list_html','?id='+options.id+'&offset='+options.offset,this._onActivitiesLoaded);}},_onActivitiesLoaded:function(json){var options=this.options;var result=$(json.result);options.more=(result.data('module-more')=='True');options.offset+=30;$('.load-less',result).remove();$('.load-more',this.el).remove();$('li',result).appendTo(this.el);this._onBuildLoadMore();options.loading=false;}};});
this.ckan.module('dashboard',function($,_){return{button:null,popover:null,searchTimeout:null,initialize:function(){$.proxyAll(this,/_on/);this.button=$('#followee-filter .btn').on('click',this._onShowFolloweeDropdown);var title=this.button.prop('title');this.button.popover({placement:'bottom',title:'Filter',html:true,content:$('#followee-popover').html()});this.button.prop('title',title);this.popover=this.button.data('popover').tip().addClass('popover-followee');},_onShowFolloweeDropdown:function(){this.button.toggleClass('active');if(this.button.hasClass('active')){setTimeout(this._onInitSearch,100);}
return false;},_onInitSearch:function(){var input=$('input',this.popover);if(!input.hasClass('inited')){input.on('keyup',this._onSearchKeyUp).addClass('inited');}
input.focus();},_onSearchKeyUp:function(){clearTimeout(this.searchTimeout);this.searchTimeout=setTimeout(this._onSearchKeyUpTimeout,300);},_onSearchKeyUpTimeout:function(){var input=$('input',this.popover);var q=input.val().toLowerCase();if(q){$('li',this.popover).hide();$('li.everything, [data-search^="'+q+'"]',this.popover).show();}else{$('li',this.popover).show();}}};});
this.ckan.module('table-toggle-more',function($,_){return{options:{i18n:{show_more:_('Show more'),show_less:_('Hide')}},initialize:function(){$.proxyAll(this,/_on/);this.el.addClass('table-toggle-more');var rows=$('.toggle-more',this.el).length;if(rows){var cols=$('thead tr th',this.el).length;var template_more=['<tr class="toggle-show toggle-show-more">','<td colspan="'+cols+'">','<small>','<a href="#" class="show-more">'+this.i18n('show_more')+'</a>','<a href="#" class="show-less">'+this.i18n('show_less')+'</a>','</small>','</td>','</tr>'].join('\n');var template_seperator=['<tr class="toggle-seperator">','<td colspan="'+cols+'">','</td>','</tr>'].join('\n');var seperator=$(template_seperator).insertAfter($('.toggle-more:last-child',this.el));$(template_more).insertAfter(seperator);$('.show-more',this.el).on('click',this._onShowMore);$('.show-less',this.el).on('click',this._onShowLess);}},_onShowMore:function($e){$e.preventDefault();this.el.removeClass('table-toggle-more').addClass('table-toggle-less');},_onShowLess:function($e){$e.preventDefault();this.el.removeClass('table-toggle-less').addClass('table-toggle-more');}}});
/* Media Grid
 * Super simple plugin that waits for all the images to be loaded in the media
 * grid and then applies the jQuery.masonry to then
 */ 
this.ckan.module('media-grid', function ($, _) {
  return {
    initialize: function () {
      var wrapper = this.el;
      wrapper.imagesLoaded(function() {
        wrapper.masonry({
          itemSelector: '.media-item'
        });
      });
    }
  };
});
