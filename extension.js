/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import St from 'gi://St';
import {Extension, gettext as _, ngettext, pgettext} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import GLib from 'gi://GLib';


export default class PlainExampleExtension extends Extension {
    enable() {

        this._indicator = new PanelMenu.Button(0.0, this.metadata.name, false);
        
        const btn = new St.Label({
            text: `Hi, ${GLib.get_user_name().charAt(0).toUpperCase()}${GLib.get_user_name().substr(1)}`,
            style_class: 'panel-button'
        });
        this._indicator.add_child(btn);
        // Main.panel.__leftBox.insert_child_at_index(this._indicator,);  // old way
        Main.panel.addToStatusArea(this.uuid, this._indicator);

        this._indicator.menu.addAction(pgettext('menu item', 'Notify'), () => {
            this._count += 1;
            const title = _('Notification');
            const body = ngettext(
                                  'You have been notified %d time',
                                  'You have been notified %d times',
                                  this._count
                                ).format(this._count)
            Main.notify(title, body);
        });
        this._count = 0;

    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
    }
}
