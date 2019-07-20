
// Tabs
$('.tabButton').on('click', function(){
  $('.tab').hide(); // Hide all tab
  $('.tabButton').removeClass('active'); // Remove class active from all tabButton
  $('#'+$(this).attr('value')).show(); // Show respective clicked tab content
  $(this).addClass('active'); // Active clicked button
});

// Settings Tab

// Show playstyle selector when ready
$(document).ready(function (){
  $('#settings').show(); // Show settings content
  $('.tabButton').first().addClass('active') // Active settings button
});

$('.play_style_buttons, #play_style_str').on('click', function(){
  cluster_intention = $(this).attr('id')
  $('#play_style_str').html(cluster_intention)
  $('#choice_play_style').toggle() // Show and hide play style selection
  $('#after_play_style').toggle() // Show and hide settings options
});

// Show Play Style info when mouse over
$('.play_style_buttons')
  .mouseenter(function () {
    let type = $(this).attr('id');
    let info_playstyle = $('#info_playstyle');

    switch(type){
      case 'social':
        info_playstyle.html("This server is a place for friendly chatter, a<br/>relaxed playstyle, and getting to know people.<br/>Everyone's welcome here!");
        break;
      case 'cooperative':
        info_playstyle.html("Surviving's more fun when you do it as a team.<br/>On this server we want to work together and do<br/>our best to tame the hostile world");
        break;
      case 'competitive':
        info_playstyle.html("This server is the perfect arena for a fair fight.<br/>Everyone needs a place to prove who's the best<br/>at surviving, fighting, building, or... whatever.");
        break;
      case 'madness':
        info_playstyle.html("Anything goes on this server! Forest will be<br/>burned, food will be nommed, and backs will be<br/>unceremoniously stabbed. Be prepared!");
        break;
      }
  })
  .mouseleave(function () {
    $('#info_playstyle').html('')
  });

// Show steam group options
$('#server_visibility').change(function(){
  if($('input[value="steamgroup"]').is(":checked")){
    $('#steamgroupinfo').toggle();
  } else{
    $('#steamgroupinfo').toggle();
  }
});

// More Settings Button
$('#button_more_settings').on('click', function(){
  $('#more_settings').toggle();
});

// Forest Tab


// Caves Tab

$('#add_caves').on('click', function(){
  $('#addCavesMsg').toggle();
  $('#active_caves').toggle();
});

// Mods Tab


// Others

function load_server(){
};

function generate_server(){
};

const switchs = [
  ['false', 'true'],
  ['online', 'offline'],
  ['survival', 'endless', 'wilderness']
];

// Prev Next Arrows
$('.arrow-left').on('click', function(){
  let $span = $(this).closest('div').find('span[type="text"]');
  let status = $span.text().toLowerCase();

  check:
  for (let x = 0, length = switchs.length; x < length; x++){
    for (let y = 0, length = switchs[x].length; y < length; y++ ){
      if(switchs[x][y] === status){
        $span.text(switchs[x][y-1]);
        break check;
      }
    }
  }

});

$('.arrow-right').on('click', function(){
  let $span = $(this).closest('div').find('span[type="text"]');
  let status = $span.text().toLowerCase();

  check:
  for (let x = 0, length = switchs.length; x < length; x++){
    for (let y = 0, length = switchs[x].length; y < length; y++ ){
      if(switchs[x][y] === status){
        $span.text(switchs[x][y+1]);
        break check;
      }
    }
  }

});