import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import Image from 'react-bootstrap/Image';
import Profile from 'assets/avatars/avatar_8.jpg';
import Default from 'assets/avatars/avatar_1.jpg';
import { useLoggedUserQuery } from 'services/userAuthApi';
import { getToken } from 'services/LocalStorage';
import Label from 'ui-component/label/Label';
import { RotatingSquare } from 'react-loader-spinner';

function Setting() {
    const token = getToken();
    const { data, isLoading } = useLoggedUserQuery({ token });
    console.log(useLoggedUserQuery({ token }), 'ssssssssssss');
    if (isLoading) {
        return (
            <RotatingSquare
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                wrapperStyle={{}}
                wrapperclassName=""
                visible={true}
            />
        );
    }
    return (
        <div>
            <MainCard title="Profile" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <img
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                className="rounded-circle"
                                width={100}
                                alt="A house with two children standing in front of it"
                                onError={(event) => {
                                    event.target.src = { Profile };
                                    event.onerror = null;
                                }}
                            />
                        </div>
                        <div className="col">
                            <Label>Name</Label>
                            <br />
                            <br />
                            <br />
                            <Label>Email</Label>
                            <br />
                            <br />
                            <br />
                            <Label>User Type</Label>
                        </div>
                        <div className="col">
                            {data.name}
                            <br />
                            <br />
                            <br />
                            {data.email}
                            <br />
                            <br />
                            <br />
                            {data.user_type}
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default Setting;
