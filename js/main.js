function sendRequest(url, method, datafeed, boxname) {
    	// console.log(url)
	var ajaxresults;
    $.ajax({
        url: url,
        type: method,
        data:  datafeed, 
        success: function(result){
        		boxname.dialog('close');
        		ajaxresults = result;
        		$.messager.alert('Saved Successfully','Update Successful.','info');
        		// console.log(result);
            },
        error: function(data,result){
            $.messager.alert({  // show error message
                title: 'Error',
                msg: 'Please try again.'

            });
        }
    });
    return ajaxresults; 
}