import { Injectable } from '@nestjs/common';

import { User } from '../user/user.entity';

import AddHighlightDTO from './dto/addHighlight.dto';
import UpdateHighlightDTO from './dto/updateHighlight.dto';

import { HighlightRepository } from './highlight.repository';

import { HighlightChangableProperty } from '../utilities/types';

@Injectable()
export class HighlightService {
  constructor(private highlightRepository: HighlightRepository) {}

  async getPublicOnes() {
    return await this.highlightRepository.findByOptions({ isPrivate: false });
  }

  async addNewHighlight(addHighlightDTO: AddHighlightDTO, user: User) {
    const newHighlight = this.highlightRepository.create({
      ...addHighlightDTO,
      user,
    });
    return await this.highlightRepository.saveOne(
      newHighlight,
      'Your highlight has been saved successfully',
    );
  }

  async getUserHighlights(
    user: User,
    options?: { isPrivate: boolean; isFavorite: boolean },
  ) {
    return await this.highlightRepository.findByOptions({
      user: { id: user.id },
      ...(options.isPrivate && { isPrivate: options.isPrivate }),
      ...(options.isFavorite && { isFavorite: options.isFavorite }),
    });
  }

  async updateHighlightDetails(
    highlightId: string,
    updateHighlightDTO: UpdateHighlightDTO,
    user: User,
  ) {
    const currentHighlight = await this.highlightRepository.findByOptions(
      {
        id: highlightId,
        user: { id: user.id },
      },
      true,
    );

    Object.entries(updateHighlightDTO).forEach(([key, value]) => {
      currentHighlight[key] = value;
    });

    return await this.highlightRepository.saveOne(
      currentHighlight,
      'Your highlight has been updated successfully',
    );
  }

  async changeHighlightPropertyState(
    highlightId: string,
    user: User,
    property: HighlightChangableProperty,
  ) {
    const currentHighlight = await this.highlightRepository.findByOptions(
      {
        id: highlightId,
        user: { id: user.id },
      },
      true,
    );

    let responseMessage: string;
    switch (property) {
      case HighlightChangableProperty.isFavorite:
        currentHighlight.isFavorite = !currentHighlight.isFavorite;
        responseMessage = `Your highlight has been ${
          currentHighlight.isFavorite ? 'favorited' : 'unfavorited'
        } successfully`;
        break;

      case HighlightChangableProperty.isPrivate:
        currentHighlight.isPrivate = !currentHighlight.isPrivate;
        responseMessage = `Your highlight has been set ${
          currentHighlight.isPrivate ? 'private' : 'public'
        } successfully`;
        break;
    }

    return await this.highlightRepository.saveOne(
      currentHighlight,
      responseMessage,
    );
  }
}
