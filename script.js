const next = document.querySelector('#next');
        const play = document.querySelector('#play');
        const prev = document.querySelector('#prev');
        const progressBar = document.querySelector('#progress-bar');
        const musicTitle = document.querySelector('.music-name');
        const musicCard = document.querySelector('.music-card');
        const musicArtist = document.querySelector('.music-artist');
        const musicCover = document.querySelector('.music-image');
        const musicCurrentTime = document.querySelector('.music-current-time');
        const musicDurationTime = document.querySelector('.music-duration-time');
        const backgroundImage = document.querySelector('#backgroundImage');
        const music = document.querySelector('audio');
        const progressZone = document.querySelector('.music-progress');

        let isPlaying = false;
        // default select first music
        let selectedMusic = 1;

        play.addEventListener('click', () => {
            isPlaying ? pauseMusic() : playMusic()
        });

        const playList = [{
            artist: 'Alec Benjamin',
            cover: 'https://i.pinimg.com/564x/c0/52/84/c05284c2fbb7dc167edeca308e39933d.jpg',
            musicName: 'Steve',
            musicPath: `AUDIOS/y2meta.com - Alec Benjamin ~ Steve (Lyrics) (128 kbps).mp3`
        }, {
            artist: 'Conan Gray',
            cover: 'https://i.pinimg.com/564x/d2/30/15/d23015b6b8f48f590ccb2263c3697e45.jpg',
            musicName: 'Maniac',
            musicPath: `AUDIOS/y2meta.com - {Tradução} Maniac - Conan Gray (128 kbps).mp3`
        }, {
            artist: 'Ashe',
            cover: 'https://i.pinimg.com/564x/c0/bf/35/c0bf3561c390befd5cc458ec87dc318e.jpg',
            musicName: 'Moral of the Story',
            musicPath: `AUDIOS/y2meta.com - Ashe - Moral of the Story (Official Audio) (128 kbps).mp3`
        }, {
            artist: 'Billie Eilish',
            cover: 'https://i.pinimg.com/564x/1d/49/59/1d495979e0be4198cefc669525a83656.jpg',
            musicName: 'idontwannabeyouanymore',
            musicPath: `AUDIOS/y2meta.com - Billie Eilish - idontwannabeyouanymore (Tradução_Legendado) (128 kbps).mp3`
        }, {
            artist: 'Conan Gray',
            cover: 'https://i.pinimg.com/736x/51/c6/af/51c6aff544a859d6fcf5e395aec09036.jpg',
            musicName: 'Heather',
            musicPath: `AUDIOS/y2meta.com - Conan Gray - Heather (128 kbps).mp3`
        }, {
            artist: 'Joji',
            cover: 'https://i.pinimg.com/564x/9f/fa/ab/9ffaabfa80377cd070025bd3b18efbb9.jpg',
            musicName: ' Tick Tock ',
            musicPath: `AUDIOS/y2meta.com - Joji - Tick Tock (Official Video) (128 kbps).mp3`
        }, {
            artist: 'Joji',
            cover: 'https://i.pinimg.com/564x/bb/2f/fd/bb2ffd1d6b262a06c4474f1ad8dbb3ca.jpg',
            musicName: ' YEAH RIGHT ',
            musicPath: `AUDIOS/y2meta.com - Joji - YEAH RIGHT (128 kbps).mp3`
        }, {
            artist: 'JVKE',
            cover: 'https://i.pinimg.com/564x/d1/aa/4a/d1aa4a1d7546f144cabfef9478edccf6.jpg',
            musicName: ' Golden Hour ',
            musicPath: `AUDIOS/y2meta.com - JVKE - golden hour (Official Lyric Video) (128 kbps).mp3`
        }, {
            artist: 'Abbey Grove',
            cover: 'https://i.pinimg.com/564x/33/ce/45/33ce455cfa3ff0d1921cfe3f0f17052f.jpg',
            musicName: ' Please Dont Go ',
            musicPath: `AUDIOS/y2meta.com - Please Don’t Go - Original Song (128 kbps.mp3`
        }
    ]

        const playMusic = () => {
            music.play();
            document.querySelector('.play-icon').classList.replace('fa-play', 'fa-pause')
            isPlaying = true;
            fadeInCover();
            musicCard.classList.add('middle-weight');
            setTimeout(() => {
                musicCard.classList.remove('middle-weight');
            }, 200)
        }

        const pauseMusic = () => {
            music.pause();
            document.querySelector('.play-icon').classList.replace('fa-pause', 'fa-play')
            isPlaying = false;
            fadeInCover();
            musicCard.classList.add('middle-weight');
            setTimeout(() => {
                musicCard.classList.remove('middle-weight');
            }, 200)
        }

        const nextMusic = () => {
            selectedMusic = (selectedMusic + 1) % playList.length
            loadMusic(playList[selectedMusic]);
            music.duration = 0;
            if (isPlaying) {
                music.play()
            }
            musicCard.classList.add('right-weight');
            progressBar.style.width = `0%`
            setTimeout(() => {
                musicCard.classList.remove('right-weight');
            }, 200)
        }

        const prevMusic = () => {
            selectedMusic = (selectedMusic - 1 + playList.length) % playList.length
            loadMusic(playList[selectedMusic]);
            if (isPlaying) {
                music.play()
            }
            musicCard.classList.add('left-weight');
            progressBar.style.width = `0%`
            setTimeout(() => {
                musicCard.classList.remove('left-weight');
            }, 200)
        }

        const loadMusic = (playList) => {
            musicArtist.textContent = playList.artist;
            musicTitle.textContent = playList.musicName;
            music.src = playList.musicPath;
            musicCover.src = `${playList.cover}`;
            backgroundImage.src = `${playList.cover}`;
            backgroundImage.animate([{
                opacity: 0,
            }, {
                opacity: 1,
            }], {
                duration: 400,
            });
            fadeInCover();
        }

        const fadeInCover = () => {
            musicCover.classList.add('animate')
            setTimeout(() => {
                musicCover.classList.remove('animate')
            }, 300)
        }

        const updateProgress = (e) => {
            const {
                duration,
                currentTime
            } = e.srcElement;
            const progressPercent = (currentTime / duration) * 100
            progressBar.style.width = `${progressPercent}%`

            if (progressPercent == 100) {
                setTimeout(() => {
                    nextMusic()
                }, 500);
            }
        }

    
        function setProgress(e) {
            const width = this.clientWidth;
            const setPoint = e.offsetX;
            const duration = music.duration;
            music.currentTime = (setPoint / width) * duration;
        }

        const setMusicTime = (e) => {
            const {
                duration,
                currentTime
            } = e.srcElement;
            calcSongTime(duration, musicDurationTime);
            calcSongTime(currentTime, musicCurrentTime);
        }

        const calcSongTime = (time, selectTime) => {
            time = Number(time);
            const m = Math.floor(time % 3600 / 60);
            const s = Math.floor(time % 3600 % 60);
            if (m < 10) {
                minute = "0" + m;
            } else minute = m
            if (s < 10) {
                second = "0" + s;
            } else second = s

            return selectTime.textContent = `${minute}:${second}`;
        }



        next.addEventListener('click', nextMusic);
        prev.addEventListener('click', prevMusic);
        music.addEventListener('timeupdate', updateProgress);
        music.addEventListener('timeupdate', setMusicTime);
        progressZone.addEventListener('click', setProgress)

        function cardAnimate(e) {
            this.querySelectorAll('.music-card').forEach(function(boxMove) {
                const x = -((window.innerWidth) / 3 - e.pageX) / 90
                const y = ((window.innerHeight) / 3 - e.pageY) / 30
                boxMove.style.transform = "rotateY(" + x + "deg) rotateX(" + y + "deg)"
            });
        }
