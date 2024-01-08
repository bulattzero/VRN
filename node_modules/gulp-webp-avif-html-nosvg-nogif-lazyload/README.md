# gulp-webp-avif-html-nosvg-nogif-lazyload

Plugin for converting «img» images to «picture» with support for modern formats and popular layout methods.
- Dual and single output format.
- Ignore SVG format. 
- Ignore GIF format.
- Ignoring the value of the «src» attribute if there is the «srcset» attribute (default usage, can change). 
- Support «sizes» attribute. 
- Convert Youtube cover link to webp construct (default usage, can change).
- Extended settings:
    - Support for one «source» with arbitrary formats.
    - Support for two «source» with arbitrary formats.
    - Replacing url values with an arbitrary string. For example, replacing the path for each image format.
    - Setting build rule for srcset attribute in «picture» if «img» has srcset attribute.
    - Youtube link conversion to webp format.
- Support for ["vanilla lazyload"](https://www.andreaverlicchi.eu/vanilla-lazyload/) plugin: 
    - Support «img» «data-src» attribute.
    - Support «img» «data-srcset» attribute.
    - Support «img» «data-sizes» attribute.
    - Insert inline thumbnail if there is no «src» attribute.
    - When you use «thumb.gif» thumbnail in the «src» attribute, its «gif» format does not change.    


## Basic usage examples
```html
// Input
<img src="images/picture.jpg">

// Output
<picture>
    <source srcset="images/picture.webp" type="image/webp">
    <img src="images/picture.jpg">
</picture>

// Input
<img src="images/picture.jpg" srcset="images/picture1000.jpg 1000w, images/picture.jpg 1920w" sizes="(max-width: 768px) 100vw, 80vw">

// Output
<picture>
  <source srcset="images/picture1000.webp 1000w, images/picture.webp 1920w" sizes="(max-width: 768px) 100vw, 80vw" type="image/webp">
  <img src="images/picture.jpg" srcset="images/picture1000.jpg 1000w, images/picture.jpg 1920w" sizes="(max-width: 768px) 100vw, 80vw">
</picture>

// Input
<img src="images/picture.svg">

// Output
<img src="images/picture.svg">

// Input
<img src="images/picture.gif">

// Output
<img src="images/picture.gif">

//// VANILLA LAZYLOAD USAGE////

// Input (without src)
<img data-src="images/picture.jpg">

// Output (without src)
<picture>
  <source srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" data-srcset="images/picture.webp" type="image/webp">
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="  data-src="images/picture.jpg">
</picture>

// Input (without src)
<img data-src="images/picture.jpg" data-srcset="images/picture1000.jpg 1000w, images/picture.jpg 1920w">

// Output (without src)
<picture>
  <source srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" data-srcset="images/picture1000.webp 1000w, images/picture.webp 1920w" type="image/webp">
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="  data-src="images/picture.jpg" data-srcset="images/picture1000.jpg 1000w, images/picture.jpg 1920w">
</picture>

// Input (with thumb.gif)
<img src="images/thumb.gif" data-src="images/picture.jpg" data-srcset="images/picture1000.jpg 1000w, images/picture.jpg 1920w" sizes="(max-width: 768px) 100vw, 80vw">

// Output (with thumb.gif)
<picture>
  <source srcset="images/thumb.gif" data-srcset="images/picture1000.webp 1000w, images/picture.webp 1920w" sizes="(max-width: 768px) 100vw, 80vw" type="image/webp">
  <img src="images/thumb.gif" data-src="images/picture.jpg" data-srcset="images/picture1000.jpg 1000w, images/picture.jpg 1920w" sizes="(max-width: 768px) 100vw, 80vw">
</picture>

//// CONVERTING YOUTUBE COVER LINK ////

// Input
<img src="https://i.ytimg.com/vi/your_id/hqdefault.jpg">

// Output
<picture>
  <source srcset="https://i.ytimg.com/vi_webp/your_id/hqdefault.webp" type="image/webp">
  <img src="https://i.ytimg.com/vi/your_id/hqdefault.jpg">
</picture>
```

## Extended usage examples
```html
// Input (dual format: AVIF + WEBP)
<img src="images/picture.jpg">

// Output (dual format: AVIF + WEBP)
<picture>
  <source srcset="images/picture.avif" type="image/avif">
  <source srcset="images/picture.webp" type="image/webp">
  <img src="images/picture.jpg">
</picture>

// Input (dual format: AVIF + WEBP and change image path)
<img src="images/picture.jpg">

// Output (dual format: AVIF + WEBP and change image path)
<picture>
  <source srcset="images/avif/picture.avif" type="image/avif">
  <source srcset="images/webp/picture.webp" type="image/webp">
  <img src="images/picture.jpg">
</picture>

// Input (srcset output = srcset input + src input)
<img src="images/picture.jpg" srcset="images/picture800.jpg 800w, images/picture1200.jpg 1200w">

// Output (srcset output = srcset input + src input)
<picture>
  <source srcset="images/picture800.webp 800w, images/picture1200.webp 1200w, images/picture.webp" type="image/webp">
  <img src="images/picture.jpg" srcset="images/picture800.jpg 800w, images/picture1200.jpg 1200w">
</picture>

// Input (srcset output = src input + srcset input)
<img src="images/picture.jpg" srcset="images/picture800.jpg 800w, images/picture1200.jpg 1200w">

// Output (srcset output = src input + srcset input)
<picture>
  <source srcset="images/picture.webp, images/picture800.webp 800w, images/picture1200.webp 1200w" type="image/webp">
  <img src="images/picture.jpg" srcset="images/picture800.jpg 800w, images/picture1200.jpg 1200w">
</picture>
```

## Install
```bash
npm i -D gulp-webp-avif-html-nosvg-nogif-lazyload
```
## Basic usage
```js
import pictureHtml from 'gulp-webp-avif-html-nosvg-nogif-lazyload';

gulp.task('html', () => {
  return gulp
    .src('src/*.html')
    .pipe(pictureHtml())
    .pipe(gulp.dest('dist'));
});
```
## Extended usege
```js
import pictureHtml from 'gulp-webp-avif-html-nosvg-nogif-lazyload';

gulp.task('html', () => {
  return gulp
    .src('src/*.html')
    .pipe(pictureHtml({
      primaryFormat: 'avif',
      primaryAfter: 'images/',
      primaryBefore: 'images/avif/',
      secondaryFormat: 'webp',
      secondaryAfter: 'images/',
      secondaryBefore: 'images/webp/',
      srcsetOutput: 0,
      youtubeCoverWebp: true
    }))
    .pipe(gulp.dest('dist'));
});
```

## Options

| Name              | Type         | Default      | Description                                                                                                                             |
| ----------------- | ------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| primaryFormat     | `string`     | `webp`       | Basic image format. Required to use.                                                                                                    |
| primaryAfter      | `string`     | ``           | The string inside the links to be replaced in the main <source> tag.                                                                    |
| primaryBefore     | `string`     | ``           | Replaced by.                                                                                                                            |
| secondaryFormat   | `string`     | ``           | Secondary image format. The option is only needed when you want to have two <source> tags.                                              |
| secondaryAfter    | `string`     | ``           | The string inside the links to be replaced in the secondary <source> tag.                                                               |
| secondaryBefore   | `string`     | ``           | Replaced by.                                                                                                                            |
| srcsetOutput      | `integer`    | `0`          | 0 - (srcset output = srcset input), 1 - (srcset output = srcset input + src input), 2 - (srcset output = src input + srcset input).     |
| youtubeCoverWebp  | `boolean`    | `true`       | Youtube link conversion to webp format                                                                                                  |
