//java search widget

 $.widget( "custom.catcomplete", $.ui.autocomplete, {
    _renderMenu: function( ul, items ) {
      var that = this,
        currentCategory = "";
      $.each( items, function( index, item ) {
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        that._renderItemData( ul, item );
      });
    }
  });

  $(function() {
    var data = [
      { label: "pizza", category: "" },
      { label: "sushi", category: "" },
      { label: "lasagna", category: "" },
      { label: "tapas", category: "" },
      { label: "tacos", category: "" },
      { label: "burrito", category: "" },
      { label: "Milk Shake", category: "" },
      { label: "Ice Cream", category: "" },
      { label: "Frozen Yogurt", category: "" },
      { label: "BBQ", category: "" },
      { label: "Barbecue", category: "" },
      { label: "Bread", category: "" },
      { label: "tacos", category: "" },
      { label: "Steak", category: "" },
      { label: "Salad", category: "" },
      { label: "Burger", category: "" },
      { label: "Doughnut", category: "" },
      { label: "Coffee", category: "" },
      { label: "subs", category: "" },
      { label: "Hogue", category: "" },
      { label: "martini", category: "" },
      { label: "johnnie walker", category: "" },
      { label: "Wine", category: "" },
      { label: "cocktail", category: "" },
      { label: "baklava", category: "" },
      { label: "smoothie", category: "" },
      { label: "fruit smoothie", category: "" },
      { label: "Mexican", category: "Cuisine" },
      { label: "Spanish", category: "Cuisine" },
      { label: "Chinese", category: "Cuisine" },
      { label: "Japanese", category: "Cuisine" },
      { label: "Cubin", category: "Cuisine" },
      { label: "Indian", category: "Cuisine" },
      { label: "Korean", category: "Cuisine" },
      { label: "American", category: "Cuisine" },
      { label: "drinks", category: "Type" },
      { label: "bars", category: "Type" },
      { label: "brunch", category: "Type" },
      { label: "lunch", category: "Type" },
      { label: "dinner", category: "Type" },
      { label: "Bakery", category: "Type" },
      { label: "Coffee Shop", category: "Type" },
      { label: "Buffet", category: "Type" },
      { label: "Scotch", category: "" },
      { label: "Whiskey", category: "Catagory" },
      { label: "Beer", category: "Catagory" },
      { label: "Deserts", category: "Catagory" },
      { label: "Entrées", category: "Catagory" },
      { label: "Appetizers", category: "Catagory" },
    ];
 
    $( "#searchobject" ).catcomplete({
	  minLength: 2,
      delay: 200,
      source: data
    });
  });