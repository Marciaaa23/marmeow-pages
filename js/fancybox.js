$(document).ready(function() {
  $('img').each(function() {
    if ($(this).parent().hasClass('fancybox')) return;
    if ($(this).parents().addBack().hasClass('nofancybox')) return;
    var alt = this.alt;
    if (alt && !$(this).closest('figure').find('figcaption').length) {
      $(this).after($('<span class="caption">').text(alt));
    }
    $(this).wrap('<a href="' + ($(this).attr('data-src') == null ? this.src : $(this).attr('data-src')) + '" title="' + alt + '" class="fancybox"></a>');
  });
  $(this).find('.fancybox').each(function(){
    $(this).attr('rel', 'article');
  });
});
$(document).ready(function() {
  $("a[href$='.jpeg' i],a[href$='.jpg' i],a[href$='.png' i],a[href$='.gif' i],a[href$='.webp' i]").attr('data-fancybox', 'gallery').fancybox({
    helpers : {
      title: { type: 'inside'}
    }
  });
});
