# easyParallax
a easy jQuery plugin

## Installation
Include jQuery to your document  
Download this package and include *easy.parallax.min.js* in your document

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="/path/easy.parallax.min.js"></script>
```

## Usage
You can easily call the plugin by using the class *parallax*  
Note: *no JavaScript call is needed*
```html
<div class="parallax" data-effect="scroll"></div>
```

##Options
###via data-attributes
You can easily add options by adding ```data-option-name="option"``` to the element you want to use.  
**Note: For data attributes, append the option name to *data-*.**
```html
<div class="parallax" data-effect="scroll" data-image-src="/path/image.jpg"></div>
```


|Key      | Default value    |    Description      |
|:-----   |:-----------------|:--------------------|
|speed    |6                 |Change easily the speed by update the count of number|
|effect   |scroll            |"scroll", "fixed" *(background-attachment: fixed)*|
|text     |false             |boolean               |
|position |default           |You can change the value to "top" when the first parallax is directly on top of the website|
|imageposition|center        | Change the image position like css style (center top, center bottom, left top, ... etc) |




Demo page coming soon
