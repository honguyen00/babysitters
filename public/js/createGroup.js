$('#createGroup').on('click', (event) => {
    event.preventDefault();
    const container = $('#groupContainer');
    container.append(
    `<div class='overlay' id='overlay'></div>
    <div class="profile-card card d-flex align-items-center">
    <div class="card-body" id='createGroupFormBody'>
        <label for='groupName'>Group Name: <input type='text' id='groupName'></input></label>
    </div>
    <div class='d-flex justify-content-around w-100'>
            <button class='closeButton btn booked'>Close</button>
            <button class='addMember btn'>Add member by email</button>
            <button class='createButton btn'>Create</button>
    </div>
    </div>`
    )
    $('.overlay').css({'display':'block'})
    $('.closeButton').on('click', () => {
        container.children().last().remove();
        $('.overlay').css({'display':'none'})
    });

    var member_count = 0;
    $('.addMember').on('click', () => {
        member_count += 1;
        $('#createGroupFormBody').append(`<label id='label-${member_count}' for='email-${member_count}'>Add user: <input type='email' class='memberEmail' id='email-${member_count}'></input><i class="fa-solid fa-trash" id='icon-${member_count}'></i></label>`);
        $(`#icon-${member_count}`).on('click', (event) => {
            console.log(event.target.id.split('-')[1])
            $(`#label-${event.target.id.split('-')[1]}`).remove();
        })
    })

    $('.createButton').on('click', (event) => {
        event.preventDefault();
        const groupName = $('#groupName').val();
        var emailInput = $('.memberEmail');
        var emailArray = [];
        if(emailInput) {
            // emailInput.forEach(item => {
            //     console.log(item.val());
            // });
            for(var i = 0; i < emailInput.length; i++) {
                if($(emailInput[i]).val().trim() != '') {
                    emailArray.push($(emailInput[i]).val().trim());
                }
            }
        }

        fetch('/api/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: groupName})
        }).then((res) => {
            if(res.ok) {
                res.json().then(async data => {
                    var groupId = data.id;
                    if(emailArray.length != 0) {
                        var seed = [];
                    
                        for (item of emailArray) {
                            fetch(`/api/users/email/${item}`)
                            .then((data) => {
                                if(data.ok) {
                                    data.json().then((res) => {
                                        fetch('/api/groupuser/', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({group_id: groupId, user_id: res.id})
                                        })
                                    })
                                }
                            })
                        }
                    }
                    document.location.reload();
                })
            } else {
                window.alert(res.statusText)
            }
        })
    });
})

