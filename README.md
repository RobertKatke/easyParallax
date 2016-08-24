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

Reminder for me: Auch über JavaScript steuerbar hinzufüüüüügenüününü

|Key      | Default value    |    Description      |
|:-----   |:-----------------|:--------------------|
|speed    |6                 |Change easily the speed by update the count of number|
|effect   |scroll            |"scroll", "fixed" *(background-attachment: fixed)*|
|text     |false             |boolean               |
|position |default           |You can change the value to "top" when the first parallax is directly on top of the website|
|imageposition|center        | Innnofffffoo fehlt |




Demo page coming soon

Note: *All images are from [unsplash.com](https://unsplash.com)*