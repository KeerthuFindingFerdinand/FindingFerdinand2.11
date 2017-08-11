(function() {
            // RGB Functions
            function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
            function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
            function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
            function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
            function cToHex(c) {
              var hex = c.toString(16);
              return hex.length == 1 ? "0" + hex : hex;
            }
            function rgbToHex(rgb) {
              return "#" + cToHex(rgb.r) + cToHex(rgb.g) + cToHex(rgb.b);
            }

            var getAverage = function(list) {
              var rgb_total = { r: 0, g: 0, b: 0};
              var weight_total = 0;
              _.each(list, function(l) {
                rgb_total.r = rgb_total.r + hexToR(l.color) * l.weight;
                rgb_total.g = rgb_total.g + hexToG(l.color) * l.weight;
                rgb_total.b = rgb_total.b + hexToB(l.color) * l.weight;
                weight_total = weight_total + l.weight;
              });
              var rgb = {
                r: ~~(rgb_total.r/weight_total),
                g: ~~(rgb_total.g/weight_total),
                b: ~~(rgb_total.b/weight_total)
              }
              return rgbToHex(rgb)
            };
            
            
      // Selections
            var selections = [];

            // Rest
            var COLORS = {
              'Red Fantasy': '#D50A3A',
              'Creamy Mauve' : '#FE686F',
              'Orange Flare' : '#F1744B',
              'Magenta Pop' : '#D62285',
              'Au Naturel' : '#C18479',
              'Cranberry' : '#BD1F5E',
              'Orange Sorbet' : '#E2341A',
              'Classic Coral' : '#E6374E',
              'Mauvelous' : '#B8737B',
              'Flaming Fuschia' : '#AE2685',
              'Pink Pizzazz' : '#D33480',
              'Bing Cherry' : '#8D0D19',
              'Nob Hill Red' : '#CB091D',
              'Tequila Sunrise' : '#EE2B20',
              'Berry Jam' : '#792E61',
              'Sinful' : '#711B23',
              'Coffee Bean' : '#5D021E',
              
            }

            var palette_template = _.template([
              '<div class="grid__item one-fifth"><div class="name"><%= name %></div>',
              '<div class="palette <%= typeof class_name !== "undefined" && class_name %>"',
              '   style="background-color:<%= code %>" data-code="<%= code %>" data-name="<%= name %>">',
              '</div></div>'
            ].join(''))

            var selection_palette_template = _.template([
              '<div class="clearfix" style="margin-bottom: 0.5em;"><div',
              '   class="palette pull-left"',
              '   style="background-color:<%= code %>" data-code="<%= code %>" data-name="<%= name %>">',
              '  <div class="name uppercase"><%= name %></div>',
              '  <input type="hidden" name="properties[Color <%= color_number %>]" data-name="<%= name %>" value="<%= name %> <%= percentage %>%">',
              '</div>',
              '<div class="slider-container clearfix">',
              '  <div class="percent" data-name="<%= name %>" data-container="percentage"><%= percentage %>%</div>',
              '  <div class="slider" data-name="<%= name %>"></div>',
              '</div>',
              '<div class="clearfix"></div></div>'
            ].join(''));



            var palette_container = $('[data-container=palettes]');
            var selection_container = $('[data-container=selection]');
            var result_container = $('[data-container=result]');


            // render palettes
            var render_pallets = function() {
              var i = 0;
              palette_container.html('')
              _.each(COLORS, function(val, key){
                palette_container.append(palette_template({
                  name: key,
                  code: val,
                class_name: _.findWhere(selections, {name: key}) ? 'selected' : ''
                }));
              });
            }
              

            // render selection
            var render_selection = function() {
              render_result();

              selection_container.html('<label class="visually-hidden">Your Color Mix</label>');

              _.each(selections, function(selection, i) {
                selection_container.append(selection_palette_template({
                  name: selection.name,
                  code: COLORS[selection.name],
                  percentage: selection.percentage,
                  color_number: (i + 1)
                }));
              });
              convert_to_slider();              
            }

            var convert_to_slider = function() {
              selection_container.find('.slider').each(function() {
                var el = $(this);
                var s = _.findWhere(selections, { name: el.data('name') });
                el.slider({
                  orientation: "horizontal",
                  range: "min",
                  max: 100,
                  value: s.percentage,
                  step: 10,
                  change: function() {
                    var val = el.slider('value');
                    s.percentage = val;
                    selection_container
                      .find('input[data-name="' + s.name + '"]')
                      .val(s.name + ' ' + s.percentage + '%');

                    selection_container
                      .find('[data-container="percentage"][data-name="' + s.name + '"]')
                      .text(s.percentage + '%');
                    
                    render_result();
                  }
                });
                el.find('.ui-slider-range').css({'background': COLORS[s.name]});
              });
            }
            
            var render_result = function() {
              if (selections.length == 0) {
                result_container.hide();
                return;
              }
                
              var hex_list = _.map(selections, function(s){
                return { color: COLORS[s.name], weight: s.percentage/100 }
              });
              var renderedcode = getAverage(hex_list);
              $('#AddToCart').css({'background': renderedcode});

              result_container.html([
                '<label class="uppercase condensed">Your<br>Mix</label>',
                palette_template({
                  name: '',
                  code: getAverage(hex_list),
                  remove: false,
              }),
                // '<div class="tiny-text" style="visibility: hidden;">',
                // '  *Color shown here may not be 100% accurate.',
                // '  Please use our Starter Kit to mix colors to get a more accurate blend.',
                // '</div>'
              ].join('')).show();
            }

            palette_container.on('click', '.palette', function(evt){
              if (selections.length >= 4) return;
              var name = $(this).attr('data-name');
              selections.push({ name: name, percentage: 100 });
              selections = _.uniq(selections, 'name');
              render_selection();
              render_pallets();
            });

            palette_container.on('click', '.palette.selected', function(evt){
              var name = $(this).attr('data-name');
              selections = _.reject(selections, { name: name });
              render_selection();
              render_pallets()
            });

            render_selection();
            render_pallets();
          })()