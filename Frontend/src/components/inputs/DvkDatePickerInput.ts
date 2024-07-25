import DvkTextInput from "./DvkTextInput";
import Component from "../../annotations/Component";

@Component({
    selector: 'dvk-date-picker-input',
})
export class DvkDatePickerInput extends DvkTextInput {

    type: string = "text";
    icon: string = "fa-regular fa-calendar";
    readonly: boolean = true;

    popupOpen: boolean = false;

    currentMonth: number = new Date().getMonth();
    currentYear: number = new Date().getFullYear();
    numberOfDaysInMonth: number = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    today: Date = new Date();

    afterRender() {
        super.afterRender();
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target as Node)) {
                this.popupOpen = false;
                this.render();
            }
        });

        this.shadowRoot!.querySelector('.input')!.addEventListener('click', () => {
            if (this.disabled) {
                return;
            }

            this.onIconClick();
        });

        let calendarHeader = this.shadowRoot!.querySelector('.calendar-header');
        if (calendarHeader) {
            calendarHeader.addEventListener('click', (e) => {
                let target = e.target as HTMLElement;
                if (target.classList.contains('fa-chevron-left')) {
                    this.changeMonth(-1);
                } else if (target.classList.contains('fa-chevron-right')) {
                    this.changeMonth(1);
                }
            });
        }

        let body = this.shadowRoot!.querySelector('.calendar-body');
        if (body) {
            body.addEventListener('click', (e) => {
                let target = e.target as HTMLElement;
                if (target.classList.contains('calendar-day')) {
                    let day = target.textContent || '1';
                    let month: any = this.currentMonth + 1;
                    if (month < 10) {
                        month = `0${month}`;
                    }
                    if (day.length === 1) {
                        day = `0${day}`;
                    }

                    this.value = `${this.currentYear}-${month}-${day}`;
                    this.popupOpen = false;
                    this.render();
                }
            });
        }
    }

    changeMonth(quantity: number) {
        this.currentMonth = this.currentMonth + quantity;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear = this.currentYear + 1;
        } else if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear = this.currentYear - 1;
        }

        this.numberOfDaysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

        this.render();
    }

    getFirstDaysNames() {
        return [...Array(7).keys()].map(day => new Date(this.currentYear, this.currentMonth, day + 1).toLocaleString('default', { weekday: 'short' }));
    }

    isToday(day: number): boolean {
        return this.today.getMonth() == this.currentMonth && this.today.getDate() == day && this.today.getFullYear() == this.currentYear;
    }

    isSelected(day: number): boolean {
        let parts = this.value.split('-');
        if (parts.length !== 3) {
            return false;
        }

        let year = parseInt(parts[0]);
        let month = parseInt(parts[1]);
        let selectedDay = parseInt(parts[2]);

        return year === this.currentYear && month === this.currentMonth + 1 && selectedDay === day;
    }

    template(): string {
        return `
            <div class="dvk-date-picker-input">
                ${super.template()}
                ${this.popupOpen ? 
                    `<div class="calendar">
                        <div class="calendar-header">
                            <i class="fa-solid fa-chevron-left"></i>
                            <span>${new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' })} ${this.currentYear}</span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>
                        <div class="calendar-body">
                            ${this.getFirstDaysNames().map(day => `<div class="calendar-day-of-week">${day}</div>`).join('')}
                            ${[...Array(this.numberOfDaysInMonth).keys()].map(day => day + 1).map(day => 
                                `<div class="${this.getClassForDay(day)}">${day}</div>`
                            ).join('')}
                        </div>
                    </div>` : ''}
            </div>
        `;
    }

    getClassForDay(day: number): string {
        let classes = ['calendar-day'];
        if (this.isToday(day)) {
            classes.push('today');
        }

        if (this.isSelected(day)) {
            classes.push('selected');
        }

        return classes.join(' ');
    }

    getCssFilesContent(): string[] {
        return [
            ...super.getCssFilesContent(),
            `
                .dvk-date-picker-input {
                    position: relative;
                    
                    &:hover, input:hover {
                        cursor: pointer;
                    }
                    
                    .calendar {
                        position: absolute;
                        bottom: 100%;
                        left: 0;
                        background-color: white;
                        border: 1px solid var(--primary-color);
                        border-radius: 5px;
                        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
                        z-index: 100;
                        
                        .calendar-header {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-between;
                            padding: 10px;
                            border-bottom: 1px solid var(--primary-color);
                            
                            i {
                                cursor: pointer;
                            }
                        }
                        
                        .calendar-body {
                            display: grid;
                            grid-template-columns: repeat(7, 1fr);
                            padding: 0 10px;
                            
                            .calendar-day-of-week {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                width: 40px;
                                height: 40px;
                            }
                            
                            .calendar-day {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                width: 40px;
                                height: 40px;
                                
                                &.today:not(.selected):not(:hover) {
                                    background-color: var(--gray-color);
                                    color: var(--white-color);
                                    border-radius: 10px;
                                }
                                
                                &.selected {
                                    background-color: var(--primary-color);
                                    color: var(--white-color);
                                    border-radius: 10px;
                                }
                                
                                &:hover {
                                    background-color: var(--primary-color);
                                    color: white;
                                    border-radius: 10px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            `
        ]
    }

    onIconClick() {
        if (this.popupOpen) {
            return;
        }
        this.popupOpen = true;
        this.render();
    }
}
