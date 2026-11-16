/**
 * Hệ thống âm thanh độc lập sử dụng Web Audio API (Không phụ thuộc file mp3 ngoài)
 * Tái hiện âm thanh mở hòm FPS CS:GO chân thực, tiếng thẻ bài lướt qua kim và hiệu ứng Jackpot SSR!
 */

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.isMuted = localStorage.getItem('codegym_gacha_muted') === 'true';
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('codegym_gacha_muted', this.isMuted);
        return this.isMuted;
    }

    // Tiếng "Tách" kim cơ khí gảy qua mép thẻ (CS:GO style)
    playTick(pitchRatio = 1) {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            
            // Cú click kim loại đanh gọn
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1400 * pitchRatio, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

            filter.type = 'highpass';
            filter.frequency.setValueAtTime(800, now);

            gain.gain.setValueAtTime(0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.05);

            // Thêm chút tiếng click gỗ/nhựa phụ trợ
            const noiseOsc = this.ctx.createOscillator();
            const noiseGain = this.ctx.createGain();
            noiseOsc.type = 'sine';
            noiseOsc.frequency.setValueAtTime(450, now);
            noiseGain.gain.setValueAtTime(0.2, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

            noiseOsc.connect(noiseGain);
            noiseGain.connect(this.ctx.destination);
            noiseOsc.start(now);
            noiseOsc.stop(now + 0.025);
        } catch (e) {
            // Ignore audio interruption
        }
    }

    // Tiếng gió rít cuộn hòm lúc bắt đầu quay
    playWhoosh() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.exponentialRampToValueAtTime(650, now + 0.25);
            osc.frequency.exponentialRampToValueAtTime(220, now + 0.6);

            gain.gain.setValueAtTime(0.01, now);
            gain.gain.linearRampToValueAtTime(0.25, now + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.75);
        } catch (e) {}
    }

    // Âm thanh hoàng kim Jackpot khi trúng Mentor SSR!
    playSsrFanfare() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            // Hợp âm chiến thắng rạng rỡ (Đô - Mi - Sol - Si - Đô cao)
            const notes = [
                { f: 523.25, t: 0.00, d: 0.4 },  // C5
                { f: 659.25, t: 0.10, d: 0.4 },  // E5
                { f: 783.99, t: 0.20, d: 0.4 },  // G5
                { f: 1046.50, t: 0.32, d: 1.2 }, // C6 ngân dài
                { f: 1318.51, t: 0.45, d: 1.5 }  // E6 ngân vàng óng
            ];

            notes.forEach(n => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(n.f, now + n.t);

                gain.gain.setValueAtTime(0.001, now + n.t);
                gain.gain.linearRampToValueAtTime(0.28, now + n.t + 0.04);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + n.d);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + n.t);
                osc.stop(now + n.t + n.d + 0.1);
            });
        } catch (e) {}
    }

    // Âm thanh khi trúng thẻ SR (Tím Thần Thánh)
    playSrSound() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const chord = [440, 554.37, 659.25, 880];
            chord.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.06);

                gain.gain.setValueAtTime(0.01, now + idx * 0.06);
                gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.06 + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.6);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + idx * 0.06);
                osc.stop(now + idx * 0.06 + 0.7);
            });
        } catch (e) {}
    }

    // Âm thanh khi trúng thẻ R
    playRSound() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.4);
        } catch (e) {}
    }

    // Âm thanh "Womp womp" hài hước khi dính Bug / Conflict
    playBugSound() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(240, now);
            osc.frequency.linearRampToValueAtTime(140, now + 0.35);
            osc.frequency.linearRampToValueAtTime(90, now + 0.7);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

            // Biquad filter làm dịu âm thanh răng cưa
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, now);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.8);
        } catch (e) {}
    }

    // Tiếng click nút bấm
    playClick() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(900, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.04);
        } catch (e) {}
    }
}

window.Sound = new SoundSystem();

