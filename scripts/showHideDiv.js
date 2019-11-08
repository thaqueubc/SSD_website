// JavaScript Document

// Grab all the outline section links
const $outlineSectionLinks	= $('.outline-section-link');
// Grab all the outline sections
const $outlineSections = $('.outline-section');

$outlineSections.not(':first').hide();

$outlineSectionLinks.click(function(e){
	e.preventDefault();
	$outlineSections.hide();
	$( $(this).data('id') ).show();
});
