# angular-vertical-resizer
An angular directive for vertical resizing divs or other objects.<br/>
<a href="http://plnkr.co/edit/3WpNZ3UZLTCDez84oHw3?p=preview">Plunker example</a>

## Installation

1. Download manually or using bower:

        bower install germanger/angular-vertical-resizer --save

2. Add to your project:

        <link rel="stylesheet" href="vertical-resizer.min.css" />
   
        <script src="angular.min.js"></script>
        <script src="vertical-resizer.min.js"></script>
        
3. Add the module to your module

        angular.module('yourApp', ['verticalResizer', ...]);
   
## Usage example

    <div id="div1" style="background-color: #ffdbdb; padding: 10px; height: 80px;"><p>I'm a resizable div</p></div>
    <vertical-resizer target-min-height="50px" target-max-height="150px" target-selector="#div1"></vertical-resizer>

Check `examples.html` or <a href="http://plnkr.co/edit/3WpNZ3UZLTCDez84oHw3?p=preview">this Plunker</a> for more examples.

## Attributes

 - `target-selector`: A dom selector for the object being resized, eg: `#foo`
 - `target-max-height` (optional): Specify if the target has a max height restriction
 - `target-min-height` (optional): Specify if the target has a min height restriction
 - `class` (optional): If not specified, the default class `.germanger-vertical-resizer` will be used
 - `style` (optional): inline styles are allowed

## Contributing

1. Clone
2. Run `bower install` (installs angular)
3. Run `npm install` (installs grunt, and grunt plugins)
4. Run `grunt` (generates minified versions)

