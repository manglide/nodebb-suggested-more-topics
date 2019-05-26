<div id="suggested_more_sg"></div>
<script type="text/javascript">
$(document).ready(function(){
    var $g = document.getElementById('suggested_more_sg');
    var link = window.location.href;
    var arr = link.split("topic");
	var getCurrentSlug = link.split("/");
	var currentPageSlug = getCurrentSlug.pop();
	var titlesOfCurrCat = [];
	var itemPos = 0;
    var api_link = arr.join("api/topic");
    $.getJSON(api_link, function (data) {
         var t = "https://example.com/api/category/" + data.category.slug;
         $.getJSON(t, function (data) {
			  for (var i in data.topics) {
                  $($g).append('<p><a href="https://example.com/topic/'+data.topics[i].slug+'">' + data.topics[i].title + '</a></p>');
				  titlesOfCurrCat.push({"title": data.topics[i].title, "slug":data.topics[i].slug, "position": i});
              }
			  var result = titlesOfCurrCat.filter((obj, index) => {
				return obj.slug.includes(currentPageSlug)
			  })
			  
			  itemPos = parseInt(result[0].position);
			  var previousArticleTitle, previousArticleSlug, nextArticleTitle, nextArticleSlug = '';
			  if(titlesOfCurrCat.length-itemPos>1) {
				  // means this itemPos element is not the last in the List
				  var t = parseInt(itemPos+1);
				  nextArticleTitle = titlesOfCurrCat[t].title;
				  nextArticleSlug = titlesOfCurrCat[t].slug;
			  } 
			  
			  if(parseInt(itemPos-1)>=0) {
				  // means that itemPos is not the first element
				  var z = parseInt(itemPos-1);
				  previousArticleTitle = titlesOfCurrCat[z].title;
				  previousArticleSlug = titlesOfCurrCat[z].slug;
			  }
			  if(previousArticleTitle!== undefined && nextArticleTitle !== undefined) {
					var $html = '<div class="row" style=""><hr /><div style="float:left;width:50%;display:inline;text-align:left;left:2px;">';
					$html += '<p>Previous Article<br /><a href="https://example.com/topic/'+previousArticleSlug+'">' + previousArticleTitle + '</a></p></div>';
					$html += '<div style="float:left;width:50%;display:inline;text-align:right;">';
					$html += '<p style="margin-right:5px;">Next Article<br /><a href="https://example.com/topic/'+nextArticleSlug+'">' + nextArticleTitle + '</a></p></div></div>';
					$(".topic-footer:first").append($html);
			  } else if(previousArticleTitle == undefined && nextArticleTitle !== undefined) {
					var $html = '<div class="row" style=""><hr />';
					$html += '<div style="float:left;width:100%;display:inline;text-align:right;margin-left: 0px">';
					$html += '<p style="margin-right:5px;">Next Article<br /><a href="https://example.com/topic/'+nextArticleSlug+'">' + nextArticleTitle + '</a></p></div></div>';
					$(".topic-footer:first").append($html);
			  } else if(previousArticleTitle !== undefined && nextArticleTitle == undefined) {
					var $html = '<div class="row" style=""><hr /><div style="float:left;width:100%;display:inline;text-align:left;left:2px;">';
					$html += '<p>Previous Article<br /><a href="https://example.com/topic/'+previousArticleSlug+'">' + previousArticleTitle + '</a></p></div>';
					$html += '</div>';
					$(".topic-footer:first").append($html);
			  } else if(previousArticleTitle == undefined && nextArticleTitle == undefined) {
					var $html = '<div class="row" style=""><hr /><div style="float:left;width:50%;display:inline;text-align:left;left:2px;">';
					$html += '</div>';
					$html += '<div style="float:left;width:50%;display:inline;text-align:right;right: 2px">';
					$html += '</div></div>';
					$(".topic-footer:first").append($html);
			  }
			  
        })
    })
});
</script>
{body}
</div></div>