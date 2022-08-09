'use babel';

import ProviderSlotView from './provider-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  providerSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.providerSlotView = new ProviderSlotView(state.providerSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.providerSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'provider-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.providerSlotView.destroy();
  },

  serialize() {
    return {
      providerSlotViewState: this.providerSlotView.serialize()
    };
  },

  toggle() {
    console.log('ProviderSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
