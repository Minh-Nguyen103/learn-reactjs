import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

SongFeature.propTypes = {

};

function SongFeature(props) {
    const albumSong = [
        {
            id: 1,
            name: 'Pop Việt ngày nay',
            thumbnails: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/0/3/8/e/038ef4d6fc12804584ff5de23edd6c37.jpg"
        },
        {
            id: 2,
            name: 'Flow này mượt phết',
            thumbnails: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/3/4/7/5/34757dc965d705b048638a49033bc6b3.jpg"
        },
        {
            id: 3,
            name: 'EDM nổi bật',
            thumbnails: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/3/7/7/e/377ee7f4eafc01ac4e06d791f66b841d.jpg"
        },
    ]
    return (
        <div>
            <h3>Lỗ tai bạn sẽ lổ tung</h3>
            <AlbumList albumList={albumSong} />


        </div>
    );
}

export default SongFeature;