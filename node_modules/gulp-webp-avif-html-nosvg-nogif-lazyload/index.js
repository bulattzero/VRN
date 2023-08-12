const Vinyl = require('vinyl')
const PluginError = Vinyl.PluginError
const through = require('through2')
const pluginName = 'gulp-webp-html-nosvg-vanilla-lazyload'

module.exports = function (options) {

	var options = Object.assign({
		'primaryFormat': 'webp', // default
		'secondaryFormat': '', // default
		'primaryAfter': '', // default
		'primaryBefore': '', // default
		'secondaryAfter': '', // default
		'secondaryBefore': '', // default
		'srcsetOutput': 0, // default
		'youtubeCoverWebp': true // default
	}, options || {});

	const extensions = ['.jpg', '.png', '.jpeg', '.GIF', '.gif', '.JPG', '.PNG', '.JPEG']
	let primaryFormatImg = ''
	let dualSource
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file)
			return
		}
		if (file.isStream()) {
			cb(new PluginError(pluginName, 'Streaming not supported'))
			return
		}
		try {
			let inPicture = false
			const data = file.contents
				.toString()
				.split('\n')
				.map(function (line) {
					if (line.indexOf('<picture') + 1) inPicture = true
					if (line.indexOf('</picture') + 1) inPicture = false
					if (line.indexOf('<img') + 1 && !inPicture) {
						const Re = /<img([^>]*)>/gi
						primaryFormatImg	= options.primaryFormat
						secondaryFormatImg	= options.secondaryFormat
						if (options.secondaryFormat == '') {
							dualSource = false
						} else {
							dualSource = true
						}
						let regexpItem,
							finishUrl,
							dataSrc,
							regexArr = [],
							imgHtmlArr = [],
							newUrlArr = [],
							newHTMLArr = [],
							dataUrlArr = [],
							dataUrlSetArr = [],
							newUrlArrSecondary = [],
							dataUrlArrSecondary = [],
							dataUrlSetArrSecondary = [],
							sizesArr = [],
							dataSizesArr = []
						while (regexpItem = Re.exec(line)) {
							regexArr.push(regexpItem)
						}
						regexArr.forEach(item => {
							if (item[0].includes(' src=')) {
								finishUrl = getSrcUrl(item[0], ' src')
							} else {
								finishUrl = '';
							}

							if (item[0].includes(' srcset=')) {
								let srcSet = getSrcUrl(item[0], ' srcset')
								let comma = ', '
								if (finishUrl == '') {
									comma = ''
								}
								if (options.srcsetOutput == 0) {
									newUrlArr.push(srcSet)
								} else if (options.srcsetOutput == 1) {
									newUrlArr.push(`${srcSet}${comma}${finishUrl}`)
								} else {
									newUrlArr.push(`${finishUrl}${comma}${srcSet}`)
								}
							} else {
								newUrlArr.push(finishUrl)
							}
							if (item[0].includes(' data-src=')) {
								dataSrc = getSrcUrl(item[0], ' data-src')
								dataUrlArr.push(dataSrc)
							} else {
								dataSrc = ''
							}
							if (item[0].includes(' data-srcset=')) {
								let dataSrcSet = getSrcUrl(item[0], ' data-srcset')
								let comma = ', '
								if (dataSrc == '') {
									comma = ''
								}
								if (options.srcsetOutput == 0) {
									dataUrlSetArr.push(dataSrcSet)
								} else if (options.srcsetOutput == 1) {
									dataUrlSetArr.push(`${dataSrcSet}${comma}${dataSrc}`)
								} else {
									dataUrlSetArr.push(`${dataSrc}${comma}${dataSrcSet}`)
								}

							}
							if (item[0].includes(' sizes=')) {
								sizesArr.push(getSrcUrl(item[0], ' sizes'))
							}
							if (item[0].includes(' data-sizes=')) {
								dataSizesArr.push(getSrcUrl(item[0], ' data-sizes'))
							}
							imgHtmlArr.push(item[0])
						})
						// Если в урле есть .gif или .svg, пропускаем
						for (let i = 0; i < newUrlArr.length; i++) {
							if (newUrlArr[i].includes('.svg') || (newUrlArr[i].includes('thumb.gif') == false && newUrlArr[i].includes('.gif'))) {
								newHTMLArr.push(imgHtmlArr[i])
								continue
							} else {
									newUrlArrSecondary[i] = newUrlArr[i]
								if (newUrlArr[i].includes('thumb.gif') == false) {
									if (options.youtubeCoverWebp && newUrlArr[i].includes('ytimg.com/vi/')) {
										newUrlArr[i] = newUrlArr[i].replaceAll('ytimg.com/vi/', 'ytimg.com/vi_webp/') //Для измения ютуб ссылки обложки
										primaryFormatImg = 'webp'
									}
									newUrlArr[i] = newUrlArr[i].replaceAll(options.primaryAfter, options.primaryBefore)
									newUrlArrSecondary[i] = newUrlArrSecondary[i].replaceAll(options.secondaryAfter, options.secondaryBefore)
								}
								if (dataUrlArr.length > 0) {
									dataUrlArrSecondary[i] = dataUrlArr[i]
									if (options.youtubeCoverWebp && dataUrlArr[i].includes('ytimg.com/vi/')) {
										dataUrlArr[i] = dataUrlArr[i].replaceAll('ytimg.com/vi/', 'ytimg.com/vi_webp/') //Для измения ютуб ссылки обложки
										primaryFormatImg = 'webp'
									}
									dataUrlArr[i] = dataUrlArr[i].replaceAll(options.primaryAfter, options.primaryBefore)
									dataUrlArrSecondary[i] = dataUrlArrSecondary[i].replaceAll(options.secondaryAfter, options.secondaryBefore)
								}
								if (dataUrlSetArr.length > 0) {
									dataUrlSetArrSecondary[i] = dataUrlSetArr[i]
									if (options.youtubeCoverWebp && dataUrlSetArr[i].includes('ytimg.com/vi/')) {
										dataUrlSetArr[i] = dataUrlSetArr[i].replaceAll('ytimg.com/vi/', 'ytimg.com/vi_webp/') //Для измения ютуб ссылки обложки
										primaryFormatImg = 'webp'
									}
									dataUrlSetArr[i] = dataUrlSetArr[i].replaceAll(options.primaryAfter, options.primaryBefore)
									dataUrlSetArrSecondary[i] = dataUrlSetArrSecondary[i].replaceAll(options.secondaryAfter, options.secondaryBefore)
								}
								for (k of extensions) {
									k = new RegExp(k, 'g')
									if (newUrlArr[i].includes('thumb.gif') == false) {
										newUrlArr[i] = newUrlArr[i].replace(k, `.${primaryFormatImg}`)
										newUrlArrSecondary[i] = newUrlArrSecondary[i].replace(k, `.${secondaryFormatImg}`)
									}
									if (dataUrlArr.length > 0) {
										dataUrlArr[i] = dataUrlArr[i].replace(k, `.${primaryFormatImg}`)
										dataUrlArrSecondary[i] = dataUrlArrSecondary[i].replace(k, `.${secondaryFormatImg}`)
									}
									if (dataUrlSetArr.length > 0) {
										dataUrlSetArr[i] = dataUrlSetArr[i].replace(k, `.${primaryFormatImg}`)
										dataUrlSetArrSecondary[i] = dataUrlSetArrSecondary[i].replace(k, `.${secondaryFormatImg}`)
									}
								}

								newHTMLArr.push(pictureRender(newUrlArr[i], dataUrlArr[i], dataUrlSetArr[i], sizesArr[i], dataSizesArr[i], imgHtmlArr[i], newUrlArrSecondary[i], dataUrlArrSecondary[i], dataUrlSetArrSecondary[i]))
							}
							line = line.replace(imgHtmlArr[i], newHTMLArr[i])
						}
						return line;
					}
					return line;
				})
				.join('\n')
			function pictureRender(url, dataUrl, dataUrlSet, sizes, dataSizes, imgHtml, urlSecondary, dataUrlSecondary, dataUrlSetSecondary) {
				let dataUrlSetHtml
				let dataUrlSetSecondaryHtml
				let sizesHtml
				let dataSizesHtml
				let dataSrcsetAtrr
				let dataSrcsetAtrrEnd
				let secondarySource
				if (sizes) {
					sizesHtml = ' sizes="' + sizes + '"'
				} else {
					sizesHtml = ''
				}
				if (dataSizes) {
					dataSizesHtml = ' data-sizes="' + dataSizes + '"'
				} else {
					dataSizesHtml = ''
				}
				if (dataUrlSet) {
					dataUrlSetHtml = dataUrlSet
					dataUrlSetSecondaryHtml = dataUrlSetSecondary
				} else {
					if (dataUrl) {
						dataUrlSetHtml = dataUrl
						dataUrlSetSecondaryHtml = dataUrlSecondary
					}
					else {
						dataUrlSetHtml = ''
						dataUrlSetSecondaryHtml = ''
					}
				}
				if (dataUrlSet || dataUrl) {
					dataSrcsetAtrr = ' data-srcset="'
					dataSrcsetAtrrEnd = '"'
				} else {
					dataSrcsetAtrr = ''
					dataSrcsetAtrrEnd = ''
				}
				if (imgHtml.indexOf(' src') < 0) {
					imgHtml = imgHtml.replace('<img', '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" ');
					if (dualSource == false || (dualSource && dataUrlSetHtml.includes('ytimg.com'))) {
						secondarySource = ''
					} else {
						secondarySource = `<source srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="${dataSrcsetAtrr}${dataUrlSetSecondaryHtml}${dataSrcsetAtrrEnd}${sizesHtml}${dataSizesHtml} type="image/${secondaryFormatImg}">`
					}
					return (`<picture><source srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="${dataSrcsetAtrr}${dataUrlSetHtml}${dataSrcsetAtrrEnd}${sizesHtml}${dataSizesHtml} type="image/${primaryFormatImg}">${secondarySource}${imgHtml}</picture>`)
				} else {
					if (dualSource == false || ((dualSource) && (dataUrlSetHtml.includes('ytimg.com') || url.includes('ytimg.com') ))) {
						secondarySource = ''
					} else {
						secondarySource = `<source srcset="${urlSecondary}"${dataSrcsetAtrr}${dataUrlSetSecondaryHtml}${dataSrcsetAtrrEnd}${sizesHtml}${dataSizesHtml} type="image/${secondaryFormatImg}">`
					}
					return (`<picture><source srcset="${url}"${dataSrcsetAtrr}${dataUrlSetHtml}${dataSrcsetAtrrEnd}${sizesHtml}${dataSizesHtml} type="image/${primaryFormatImg}">${secondarySource}${imgHtml}</picture>`)
				}
			}
			function getSrcUrl(markup, attr) {
				return markup.match(`${attr}=\"(.*?)\"`)[1]
			}
			file.contents = new Buffer.from(data)
			this.push(file)
		} catch (err) {
			console.log('[ERROR] Make sure that there are no spaces and/or Cyrillic in the name of the image file')
			this.emit('error', new PluginError(pluginName, err))
		}
		cb()
	})
}
