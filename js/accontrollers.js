$( function() {
    var $accform = $( '#accform' );
    
    $accform.validationEngine();
    
    $accform.formToWizard({
        submitButton: 'SaveAccount',
        showProgress: false, //default value for showProgress is also true
        nextBtnName: 'Next >>',
        prevBtnName: '<< Previous',
        showStepNo: false,
        validateBeforeNext: function() {
             return $accform.validationEngine( 'validate' );
        }
    });    
});

var url, method;
$('#cc').layout();
function newUser() {
    url=serverurl;
    method='POST';
    $('#accform').form('clear');
    $('#accform').formToWizard( 'GotoStep', 1 );
    $('#bank_name').val('Bitcoin');
    $('#ac_type').val('BTC');
    $("input[name='_token']").val(token);
    $('#cc').layout('expand', 'east');
}


function editUser() {
    var row = $('#dg').datagrid('getSelected');
    method = 'PUT';
    $('#cc').layout('expand', 'east');
    if (row) {
        $('#accform').form('load', row);
        url = serverurl + '/' + row.id;
    }
}

function saveUser() {
    
    $.ajax({
        url: url,
        type: method,
        data:  $('#accform').serialize() + "&_token=" + token, 
        success: function(result){
                var obj = JSON.parse(result);
                $('#cc').layout('collapse', 'east');  // close the dialog
                $('#dg').datagrid('reload'); // reload the user data
                $.messager.alert('Saved Successfully','Account Saved Successfully.','info');
            },
        error: function(data,result){
            $.messager.alert({  // show error message
                title: 'Error',
                msg: 'Please try again.'

            });
        }
    });
}
function removeUser() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $.messager.confirm('Confirm', 'Are you sure you want to delete this account?', function (r) {
            if (r) {

                $.ajax({
                    url: serverurl + '/' +row.id, 
                    type: 'DELETE',
                    data: "_token="+token, 
                    success: function (result) 
                    {
                        var obj = JSON.parse(result);
                        if (obj.Success){
                            $('#dg').datagrid('reload'); // reload the user data
                            $.messager.alert('Deleted Successfully','Account Deleted Successfully.','info');
                        } else {

                            $.messager.alert({  // show error message
                                title: 'Error',
                                msg: result.Message

                            });
                        }
                    }
                });
            }
        });
    }
}